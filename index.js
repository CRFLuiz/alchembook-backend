require('dotenv').config();
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const bcrypt = require('bcryptjs'); // Importar bcryptjs
const { User } = require('./models'); // Importar o modelo User
const app = express();
const port = 3000;

// Remover a rota padrão para evitar conflito com o static

const OpenRouterLLM = require('./llm');

const models = [
  'meta-llama/llama-4-scout:free',
  'google/gemini-2.0-flash-exp:free',
  'qwen/qwen3-32b:free', //reasoning
]

const llm = new OpenRouterLLM(
  models[0], 
  process.env.OPENROUTER_API_KEY
);

// Configuração do Redis
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: redisUrl });

redisClient.on('connect', () => console.log('Conectado ao Redis!'));
redisClient.on('error', (err) => console.error('Erro na conexão com o Redis:', err));

// Conectar ao Redis
(async () => {
  await redisClient.connect();
})();

// Configuração do express-session
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use uma chave secreta forte e gerada aleatoriamente em produção
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use true em produção com HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);

app.use(express.json());

// Rota de Signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const user = await User.create({ username, email, password: hashedPassword });
    
    // Opcional: Logar o usuário automaticamente após o cadastro
    req.session.userId = user.id;
    req.session.username = user.username;
    await req.session.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Nome de usuário ou e-mail já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    await req.session.save();

    res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.post('/chat', async (req, res) => {
  // Adicionar verificação de autenticação para a rota /chat
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Não autorizado. Faça login para conversar.' });
  }

  const { message } = req.body;
  // O token de sessão agora é gerenciado pelo express-session e está em req.session.id
  const sessionId = req.session.id;

  // Recuperar o histórico da sessão do Redis (se existir)
  let conversationHistory = req.session.history || [];

  try {
    // Passar o histórico atual e a nova mensagem para o LLM
    const { response, updatedHistory } = await llm.converse(message, conversationHistory);
    
    // Salvar o histórico atualizado na sessão
    req.session.history = updatedHistory;
    await req.session.save(); // Garante que a sessão seja salva no Redis

    res.json({ response });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'alchembook-frontend')));
app.use('/alchembook-frontend', express.static(path.join(__dirname, 'alchembook-frontend')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
