import { OpenRouterLLM } from './OpenRouterLLM.js';

export class MetaLlamaLLM extends OpenRouterLLM {
  constructor(apiKey, token, systemPrompt = null) {
    super('meta-llama/llama-4-scout:free', apiKey);
    this.token = token;
    if (systemPrompt) this.systemPrompt = systemPrompt;
  }

  async converse(userMessage) {
    return await this.converse(userMessage, this.token, this.systemPrompt);
  }
}
