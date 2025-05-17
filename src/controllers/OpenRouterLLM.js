const OpenAI = require('openai');

class OpenRouterLLM {
  constructor({ model, systemPrompt=null }) {
    if(!model) throw new Error('Model is required');
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.LLMbase = this.generateBase();
  }

  generateBase(){
    return new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.apiKey
    });
  }

  async completion(messages = []){
    if(!Array.isArray(messages) || messages.length === 0) return 'Didn\'t receive any messages';
    
    const completion = await this.LLMbase.chat.completions.create({
      model: this.model,
      messages,
    });
    return completion;
  }

  async getHistoryMessages(user){
    return [];
  }

  async talk(message, user){
    if(!message) return 'Didn\'t receive any messages';
    let messages = [];
    if(this.systemPrompt) messages.push({ role: 'system', content: this.systemPrompt });
    const historyMessages = await this.getHistoryMessages(user);
    messages = messages.concat(historyMessages);
    messages.push({ role: 'user', content: message });
    const response = await this.completion(messages);
    return response.choices[0].message.content;
  }
}

module.exports = OpenRouterLLM;