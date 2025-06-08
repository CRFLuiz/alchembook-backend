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

    const pmResponse = response.choices[0].message.content;
    console.log('PM Response:', pmResponse);

    // Conversão Markdown para HTML
    const converterResponse = await this.openai.chat.completions.create({
      model: this.converterModel,
      messages: [
        { role: 'system', content: 'Converta o markdown abaixo para HTML, substituindo quebras de linha (\n) por <p></p>' },
        { role: 'user', content: pmResponse }
      ],
    });

    const htmlResponse = converterResponse.choices[0].message.content.replace(/\\n/g, '').replace(/\n/g, '');
    console.log('HTML Response:', htmlResponse);

    history.push({ role: 'assistant', content: htmlResponse });
    this.histories.set(token, history);

    return htmlResponse;
  }
}
