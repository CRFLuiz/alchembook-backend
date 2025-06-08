  import { OpenRouterLLM } from './OpenRouterLLM.js';
  import { Prompts } from './Prompts.js';
  
  export class ProductLLM extends OpenRouterLLM {
    constructor(systemPrompt = null) { // Sem prompt padrão explícito
      super('product_model', systemPrompt);
    }
  }
