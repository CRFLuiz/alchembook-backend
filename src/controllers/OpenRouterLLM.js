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
    
    try{
      const completion = await this.LLMbase.chat.completions.create({
        model: this.model,
        messages,
      });
      return completion;
    }catch(error){
      console.error('Error in completion: ', error);
      throw new Error('Error in completion');
    }
  }

  async getHistoryMessages(user){
    return [];
  }

  async singleMessage(message){
    let messages = [];
    if(this.systemPrompt) messages.push({ role: 'system', content: this.systemPrompt });
    // const historyMessages = await this.getHistoryMessages(user);
    // messages = messages.concat(historyMessages);
    messages.push({ role: 'user', content: message });
    return messages;
  }

  async conversation(message){
    let messages = [];
    if((!message[0].role == 'system') && this.systemPrompt) messages.push({ role: 'system', content: this.systemPrompt });
    messages = messages.concat(message);
    return messages;
  }

  async talk(message, user){
    if(!message) return 'Didn\'t receive any messages';

    let history;

    if(Array.isArray(message)) history = await this.conversation(message);
    else history = await this.singleMessage(message);
    
    try{
      const response = await this.completion(history);
      return response.choices[0].message.content;

    }catch(error){
      console.error('Error in talk: ', error);
      throw new Error('Error in talk');
    }
  }
}

module.exports = OpenRouterLLM;