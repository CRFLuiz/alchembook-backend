const OpenAI = require('openai');

export class OpenRouterLLM {
  constructor(modelName, apiKey) {
    this.modelName = modelName;
    this.histories = new Map();
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey,
    });
    this.converterModel = 'openai/gpt-3.5-turbo'; // Modelo para conversão Markdown > HTML
  }

  async converse(userMessage, token, systemPrompt = null) {
    if (!token) throw new Error('Token de sessão é obrigatório');
    
    let history = this.histories.get(token) || [];

    if (!history.length && systemPrompt) {
      history.push({ role: 'system', content: systemPrompt });
    }

    history.push({ role: 'user', content: userMessage });

    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: history,
    });

    return response;
  }
}
