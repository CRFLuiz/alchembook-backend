import { OpenRouterLLM } from './OpenRouterLLM.js';

export class QwenLLM extends OpenRouterLLM {
  constructor(apiKey, token, systemPrompt = null) {
    super('qwen/qwen3-32b:free', apiKey);
    this.token = token;
    if (systemPrompt) this.systemPrompt = systemPrompt;
  }

  async converse(userMessage) {
    return await super.converse(userMessage, this.token, this.systemPrompt);
  }
}
