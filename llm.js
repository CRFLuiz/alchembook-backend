class LLM {
  constructor(modelName) {
    this.modelName = modelName;
    this.history = [];
  }

  async converse(userMessage) {
    this.history.push({ role: 'user', content: userMessage });
    // Implementação real de chamada à LLM
    const { OpenAIApi, Configuration } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: this.modelName,
      messages: this.history,
      max_tokens: 2048,
    });
    this.history.push({ role: 'assistant', content: response.choices[0].message.content });
    return response.choices[0].message.content;
  }
}

module.exports = { LLM };
