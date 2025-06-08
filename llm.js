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

    if (history.length === 0) {
      history.push({ role: 'system', content: systemPrompt });
    }

    history.push({ role: 'user', content: userMessage });

    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: history,
    });

    const pmResponse = response.choices[0].message.content//.replace(/^{.*?"response":\s*"/g, '').replace(/}\s*$/g, '');
    console.log('PM Response:', pmResponse);

    // Converter markdown para HTML usando outra LLM
    const converterResponse = await this.openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
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

module.exports = OpenRouterLLM;
