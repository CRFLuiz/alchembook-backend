require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Alchembook Backend running!');
});

const OpenRouterLLM = require('./llm');
const llm = new OpenRouterLLM(
  'qwen/qwen3-32b:free', 
  process.env.OPENROUTER_API_KEY
);

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, token } = req.body; console.log(req.body);
  if (!token) return res.status(400).json({ error: 'Token de sessão é obrigatório' });
  
  try {
    console.log('try')
    const response = await llm.converse(message, token);
    console.log('response', response);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
