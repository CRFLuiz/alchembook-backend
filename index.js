require('dotenv').config();
const express = require('express');
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

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token de sessão é obrigatório' });
  
  try {
    const response = await llm.converse(message, token);
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
