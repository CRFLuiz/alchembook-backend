require('dotenv').config();
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
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

app.post('/chat', async (req, res) => {
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
