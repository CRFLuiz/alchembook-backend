# Documentação do Backend Alchembook - v2

## Visão Geral

O backend do Alchembook é um serviço que atua como um Project Manager especializado na criação de eBooks. Seu propósito principal é automatizar a coleta de informações e o planejamento de projetos de eBooks, minimizando a necessidade de intervenção humana (Product Owner) após o início do projeto. Ele interage com modelos de linguagem (LLMs) para conversar com o usuário, coletar requisitos e gerar respostas formatadas em HTML.

**A partir desta versão, o histórico de conversas é persistido utilizando sessões gerenciadas pelo Express e armazenadas no Redis, garantindo a continuidade da conversa entre as requisições.**

## Arquitetura

### Entrypoint
O ponto de entrada da aplicação é o arquivo `index.js`.

### Módulos Principais e Fluxos de Dados

1.  **`index.js`**:
    *   Inicializa o servidor Express.
    *   Configura o uso de variáveis de ambiente com `dotenv`.
    *   **Configura e utiliza `express-session` com `connect-redis` para gerenciar e persistir sessões de usuário no Redis.**
    *   Importa e instancia a classe `OpenRouterLLM` (do arquivo `llm.js`).
    *   Define uma rota POST `/chat` para lidar com as interações do usuário.
    *   Serve os arquivos estáticos do frontend (`alchembook-frontend`).
    *   Inicia o servidor na porta 3000.

2.  **`llm.js`**:
    *   Define a classe `OpenRouterLLM`, responsável por gerenciar as conversas com os modelos de linguagem.
    *   Utiliza a biblioteca `openai` para interagir com a API do OpenRouter.
    *   **Não mantém mais um histórico de conversas interno. O histórico é recebido como parâmetro e retornado após a atualização.**
    *   Implementa a lógica para enviar mensagens do usuário para um LLM (configurado como um Project Manager de eBooks) e receber a resposta.
    *   Realiza uma segunda chamada a um LLM (GPT-3.5-turbo) para converter a resposta do Project Manager (em Markdown) para HTML.

### Fluxo de Dados:

1.  O frontend envia uma requisição POST para `/chat` com `message` (mensagem do usuário). **O `token` de sessão não é mais enviado no corpo da requisição, sendo gerenciado automaticamente pelos cookies de sessão.**
2.  `index.js` recebe a requisição. O middleware `express-session` recupera a sessão do usuário (ou cria uma nova) do Redis.
3.  O histórico da conversa é recuperado de `req.session.history` (ou inicializado como vazio).
4.  `index.js` chama o método `converse` da instância `OpenRouterLLM`, passando a `message` do usuário e o `conversationHistory` atual.
5.  `OpenRouterLLM.converse` adiciona a mensagem do usuário ao histórico, faz a chamada ao LLM Project Manager, converte a resposta para HTML e adiciona a resposta do assistente ao histórico.
6.  `OpenRouterLLM.converse` retorna a resposta HTML e o `updatedHistory`.
7.  `index.js` salva o `updatedHistory` de volta em `req.session.history` e garante que a sessão seja persistida no Redis.
8.  `index.js` envia a resposta HTML de volta para o frontend.

## Tecnologias Usadas

*   **Linguagem**: JavaScript (Node.js)
*   **Framework Web**: Express.js
*   **Gerenciamento de Variáveis de Ambiente**: `dotenv`
*   **Interação com LLMs**: Biblioteca `openai` (apontando para a API do OpenRouter.ai)
*   **Gerenciamento de Sessão**: `express-session`
*   **Armazenamento de Sessão**: `connect-redis` e **Redis**
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
    *   **Gerenciamento de sessões de usuário e persistência do histórico de conversas via Redis.**
*   **Principais Funções/Lógica**:
    *   `app.use(express.json())`: Habilita o parsing de JSON no corpo das requisições.
    *   **Configuração do Redis Client**:
        *   `redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'`: Define o URL do Redis, permitindo configuração via variável de ambiente ou usando um padrão.
        *   `createClient({ url: redisUrl })`: Cria o cliente Redis.
        *   `redisClient.connect()`: Conecta ao servidor Redis.
    *   **Configuração do express-session**:
        *   `store: new RedisStore({ client: redisClient })`: Configura o Redis como o armazenamento para as sessões.
        *   `secret: process.env.SESSION_SECRET || 'your_secret_key'`: Chave secreta para assinar o cookie de sessão. **Deve ser uma string forte e aleatória em produção.**
        *   `resave: false`, `saveUninitialized: false`: Configurações padrão para evitar problemas de concorrência e salvar sessões vazias.
        *   `cookie: { secure: ..., httpOnly: ..., maxAge: ... }`: Configurações do cookie de sessão para segurança e tempo de vida.
    *   `app.post('/chat', async (req, res) => { ... })`:
        *   **Rota**: `/chat` (POST)
        *   **Parâmetros de Requisição (body)**:
            *   `message` (string): A mensagem do usuário para o LLM.
        *   **Formato de Resposta**: JSON com a chave `response` contendo a resposta HTML do LLM.
        *   **Fluxo**:
            1.  A mensagem do usuário é extraída de `req.body.message`.
            2.  O histórico da conversa é recuperado de `req.session.history` (ou inicializado como um array vazio se for uma nova sessão).
            3.  Chama `llm.converse`, passando a `message` e o `conversationHistory`.
            4.  A resposta do LLM e o histórico atualizado são recebidos.
            5.  O `updatedHistory` é salvo de volta em `req.session.history`.
            6.  `req.session.save()` é chamado para garantir que a sessão seja persistida no Redis.
            7.  A resposta HTML é enviada de volta ao frontend.
    *   `app.use(express.static(...))`: Configura o Express para servir os arquivos estáticos do diretório `alchembook-frontend`.
    *   `app.listen(port, () => { ... })`: Inicia o servidor na porta especificada (3000).
*   **Interações**: Interage com `llm.js` para processar as mensagens do chat, com o sistema de arquivos para servir o frontend e com o servidor Redis para gerenciar sessões.

### `llm.js`

*   **Responsabilidades**:
    *   Encapsular a lógica de interação com os modelos de linguagem.
    *   Aplicar prompts de sistema para guiar o comportamento dos LLMs.
    *   Converter respostas de Markdown para HTML.
*   **Principais Funções/Lógica**:
    *   **`constructor(modelName)`**:
        *   Inicializa a instância da classe.
        *   Define o nome do modelo LLM principal a ser usado.
        *   **Não há mais `this.histories` interno; o histórico é gerenciado externamente.**
        *   Configura o cliente `OpenAI` para usar a API do OpenRouter.
    *   **`async converse(userMessage, conversationHistory = [])`**:
        *   **Parâmetros**:
            *   `userMessage` (string): A mensagem atual do usuário.
            *   `conversationHistory` (array de objetos): O histórico da conversa atual, recebido do `index.js`.
        *   **Fluxo**:
            1.  Cria uma cópia do `conversationHistory` recebido.
            2.  Adiciona um `systemPrompt` ao histórico se for uma nova sessão (histórico vazio ou sem prompt de sistema).
            3.  Adiciona a `userMessage` ao histórico.
            4.  Faz uma chamada `openai.chat.completions.create` para o LLM principal (`this.modelName`) com o histórico da conversa.
            5.  Extrai a resposta do LLM Project Manager.
            6.  Faz uma segunda chamada `openai.chat.completions.create` para o modelo `openai/gpt-3.5-turbo` com um prompt para converter a resposta do Project Manager de Markdown para HTML.
            7.  Limpa quebras de linha da resposta HTML.
            8.  Adiciona a resposta HTML (do assistente) ao histórico da conversa.
            9.  **Retorna um objeto contendo a `response` (HTML) e o `updatedHistory` (o histórico completo da conversa).**
*   **Interações**: Interage diretamente com a API do OpenRouter (via biblioteca `openai`).

### Outros Arquivos/Diretórios Observados

*   **`alchembook-frontend/`**: Contém os arquivos estáticos do frontend (HTML, CSS, JavaScript) que são servidos pelo backend.
*   **`controllers/`**: Contém arquivos como `GoogleGeminiLLM.js`, `MetaLlamaLLM.js`, `OpenRouterLLM.js`, `Prompts.js`, `QwenLLM.js`. Embora não importados diretamente por `index.js` ou `llm.js` no fluxo atual, eles sugerem uma arquitetura modular para diferentes implementações de LLMs ou prompts, que poderiam ser integradas no futuro.
*   **`openrouter-docs/`**: Provavelmente contém documentação relacionada à integração com o OpenRouter.
*   **`package.json`, `package-lock.json`, `yarn.lock`**: Arquivos de configuração de projeto Node.js e gerenciamento de dependências.
*   **`.gitignore`, `LICENSE`, `README.md`**: Arquivos padrão de repositório.
