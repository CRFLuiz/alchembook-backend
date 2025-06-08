const express = require('express');
const { LLM } = require('./llm');

const app = express();
const port = 3000;

const llm = new LLM('openrouter/nvidia/llama-3.1-nemotron-ultra-253b-v1');

app.use(express.json());

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  llm.converse(userMessage)
    .then(response => res.json({ response }))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
