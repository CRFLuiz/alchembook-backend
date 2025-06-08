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

  async converse(userMessage, token) {
    if (!token) throw new Error('Token de sessão é obrigatório');
    
    let history = this.histories.get(token) || [];

    // System prompt para configurar o Project Manager
    const systemPrompt = `
      Você é um Project Manager especializado em criação de eBooks. Seu objetivo é coletar todas as informações necessárias para planejar e executar a criação de um eBook sem que o Product Owner precise estar presente após o início do projeto. 

      Sempre que um novo usuário iniciar uma sessão, você deve perguntar:
      1. Qual é o tema principal do eBook?
      2. Qual é o público-alvo?
      3. Quantas páginas aproximadamente o eBook deve ter?
      4. Qual é a estrutura desejada (introdução, capítulos, conclusão, etc.)?
      5. Qual é o tom da escrita (formal, informal, motivacional, etc.)?
      6. Existem requisitos específicos (ilustrações, formatos, deadlines)?

      Após coletar essas informações, você deve criar um resumo do projeto e seguir com a organização das tarefas. Mantenha o Product Owner informado apenas em pontos críticos.

      Se o usuário já fornecer todas as informações, pule as perguntas e prossiga com o planejamento.
    `;

    // Verifica se é a primeira mensagem da sessão
    if (history.length === 0) {
      history.push({ role: 'system', content: systemPrompt });
    }

    history.push({ role: 'user', content: userMessage });

    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: history,
    });

    console.log(response.choices[0].message)

    const assistantResponse = response.choices[0].message.content;
    history.push({ role: 'assistant', content: assistantResponse });
    this.histories.set(token, history);

    return assistantResponse;
  }
}

module.exports = OpenRouterLLM;
