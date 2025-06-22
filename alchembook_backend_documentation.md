# Documentação do Backend Alchembook

## Visão Geral

O backend do Alchembook é um serviço que atua como um Project Manager especializado na criação de eBooks. Seu propósito principal é automatizar a coleta de informações e o planejamento de projetos de eBooks, minimizando a necessidade de intervenção humana (Product Owner) após o início do projeto. Ele interage com modelos de linguagem (LLMs) para conversar com o usuário, coletar requisitos e gerar respostas formatadas em HTML.

## Arquitetura

### Entrypoint
O ponto de entrada da aplicação é o arquivo `index.js`.

### Módulos Principais e Fluxos de Dados

1.  **`index.js`**:
    *   Inicializa o servidor Express.
    *   Configura o uso de variáveis de ambiente com `dotenv`.
    *   Importa e instancia a classe `OpenRouterLLM` (do arquivo `llm.js`).
    *   Define uma rota POST `/chat` para lidar com as interações do usuário.
    *   Serve os arquivos estáticos do frontend (`alchembook-frontend`).
    *   Inicia o servidor na porta 3000.

2.  **`llm.js`**:
    *   Define a classe `OpenRouterLLM`, responsável por gerenciar as conversas com os modelos de linguagem.
    *   Utiliza a biblioteca `openai` para interagir com a API do OpenRouter.
    *   Mantém um histórico de conversas por sessão (identificado por um `token`).
    *   Implementa a lógica para enviar mensagens do usuário para um LLM (configurado como um Project Manager de eBooks) e receber a resposta.
    *   Realiza uma segunda chamada a um LLM (GPT-3.5-turbo) para converter a resposta do Project Manager (em Markdown) para HTML.

### Fluxo de Dados:

1.  O frontend envia uma requisição POST para `/chat` com `message` (mensagem do usuário) e `token` (token de sessão).
2.  `index.js` recebe a requisição e chama o método `converse` da instância `OpenRouterLLM`.
3.  `OpenRouterLLM.converse` recupera o histórico da sessão (ou inicia um novo), adiciona a mensagem do usuário e envia para o LLM configurado como Project Manager.
4.  A resposta do LLM Project Manager (em Markdown) é então enviada para um segundo LLM para conversão para HTML.
5.  A resposta final em HTML é salva no histórico da sessão e retornada ao `index.js`.
6.  `index.js` envia a resposta HTML de volta para o frontend.

## Tecnologias Usadas

*   **Linguagem**: JavaScript (Node.js)
*   **Framework Web**: Express.js
*   **Gerenciamento de Variáveis de Ambiente**: `dotenv`
*   **Interação com LLMs**: Biblioteca `openai` (apontando para a API do OpenRouter.ai)
*   **Modelos de Linguagem**:
    *   `meta-llama/llama-4-scout:free` (ou outros configurados em `index.js` para o papel de Project Manager)
    *   `openai/gpt-3.5-turbo` (para conversão de Markdown para HTML)
*   **Gerenciamento de Pacotes**: `npm` ou `yarn` (evidenciado por `package.json`, `package-lock.json`, `yarn.lock`)

## Explicação por Componente

### `index.js`

*   **Responsabilidades**:
    *   Configuração e inicialização do servidor web.
    *   Definição de rotas da API.
    *   Servir arquivos estáticos do frontend.
    *   Orquestração da comunicação entre o frontend e a lógica de LLM.
*   **Principais Funções/Lógica**:
    *   `app.use(express.json())`: Habilita o parsing de JSON no corpo das requisições.
    *   `app.post('/chat', async (req, res) => { ... })`:
        *   **Rota**: `/chat` (POST)
        *   **Parâmetros de Requisição (body)**:
            *   `message` (string): A mensagem do usuário para o LLM.
            *   `token` (string): Um token de sessão para identificar o histórico da conversa.
        *   **Formato de Resposta**: JSON com a chave `response` contendo a resposta HTML do LLM.
        *   **Fluxo**: Valida a presença do `token`, chama `llm.converse`, e retorna a resposta ou um erro.
    *   `app.use(express.static(...))`: Configura o Express para servir os arquivos estáticos do diretório `alchembook-frontend`.
    *   `app.listen(port, () => { ... })`: Inicia o servidor na porta especificada (3000).
*   **Interações**: Interage com `llm.js` para processar as mensagens do chat e com o sistema de arquivos para servir o frontend.

### `llm.js`

*   **Responsabilidades**:
    *   Encapsular a lógica de interação com os modelos de linguagem.
    *   Gerenciar o histórico de conversas para cada sessão de usuário.
    *   Aplicar prompts de sistema para guiar o comportamento dos LLMs.
    *   Converter respostas de Markdown para HTML.
*   **Principais Funções/Lógica**:
    *   **`constructor(modelName)`**:
        *   Inicializa a instância da classe.
        *   Define o nome do modelo LLM principal a ser usado.
        *   Cria um `Map` (`this.histories`) para armazenar o histórico de conversas, indexado pelo token de sessão.
        *   Configura o cliente `OpenAI` para usar a API do OpenRouter.
    *   **`async converse(userMessage, token)`**:
        *   **Parâmetros**:
            *   `userMessage` (string): A mensagem atual do usuário.
            *   `token` (string): O token de sessão.
        *   **Fluxo**:
            1.  Verifica se o `token` é fornecido.
            2.  Recupera o histórico da conversa para o `token` ou inicializa um novo.
            3.  Adiciona um `systemPrompt` ao histórico se for uma nova sessão. Este prompt define o papel do LLM como um Project Manager de eBooks e lista as perguntas iniciais.
            4.  Adiciona a `userMessage` ao histórico.
            5.  Faz uma chamada `openai.chat.completions.create` para o LLM principal (`this.modelName`) com o histórico da conversa.
            6.  Extrai a resposta do LLM Project Manager.
            7.  Faz uma segunda chamada `openai.chat.completions.create` para o modelo `openai/gpt-3.5-turbo` com um prompt para converter a resposta do Project Manager de Markdown para HTML.
            8.  Limpa quebras de linha da resposta HTML.
            9.  Adiciona a resposta HTML ao histórico da conversa.
            10. Atualiza o histórico no `this.histories` Map.
            11. Retorna a resposta HTML.
*   **Interações**: Interage diretamente com a API do OpenRouter (via biblioteca `openai`).

### Outros Arquivos/Diretórios Observados (mas não diretamente utilizados no fluxo principal atual)

*   **`alchembook-frontend/`**: Contém os arquivos estáticos do frontend (HTML, CSS, JavaScript) que são servidos pelo backend.
*   **`controllers/`**: Contém arquivos como `GoogleGeminiLLM.js`, `MetaLlamaLLM.js`, `OpenRouterLLM.js`, `Prompts.js`, `QwenLLM.js`. Embora não importados diretamente por `index.js` ou `llm.js` no fluxo atual, eles sugerem uma arquitetura modular para diferentes implementações de LLMs ou prompts, que poderiam ser integradas no futuro.
*   **`openrouter-docs/`**: Provavelmente contém documentação relacionada à integração com o OpenRouter.
*   **`package.json`, `package-lock.json`, `yarn.lock`**: Arquivos de configuração de projeto Node.js e gerenciamento de dependências.
*   **`.gitignore`, `LICENSE`, `README.md`**: Arquivos padrão de repositório.
