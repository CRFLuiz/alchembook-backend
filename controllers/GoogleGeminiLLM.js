import { OpenRouterLLM } from './OpenRouterLLM.js';

export class GoogleGeminiLLM extends OpenRouterLLM {
  constructor(apiKey, token, systemPrompt = null) {
    super('google/gemini-2.0-flash-exp:free', apiKey);
    this.token = token;
    if (systemPrompt) this.systemPrompt = systemPrompt;
  }

  async converse(userMessage) {
    return await super.converse(userMessage, this.token, this.systemPrompt);
  }
}
