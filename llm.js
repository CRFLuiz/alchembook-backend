const OpenAI = require('openai');

class OpenRouterLLM {
  constructor(modelName) {
    this.modelName = modelName;
    this.histories = new Map(); // {token: history}
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async converse(userMessage, token) {console.log('converse', userMessage, token);
    if (!token) throw new Error('Token de sessão é obrigatório');
    
    let history = this.histories.get(token) || [];
    history.push({ role: 'user', content: userMessage });
    console.log('history', history);
    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: history,
    });
    console.log('response', response);
    const assistantResponse = response.choices[0].message.content;
    history.push({ role: 'assistant', content: assistantResponse });
    this.histories.set(token, history);
    console.log('returning')
    return assistantResponse;
  }
}

module.exports = OpenRouterLLM;
