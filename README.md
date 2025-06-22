# Alchembook Backend

## Descrição
API Node.js para gerenciamento de criação de eBooks, integrando um Project Manager baseado em LLM via OpenRouter. O projeto inclui um frontend simples para interação.

## Funcionalidades
- **Endpoint `/chat`**: Interage com o Project Manager para criar eBooks.
- **Autenticação de Usuários**: Rotas de `signup` e `login` com persistência de dados via PostgreSQL e Sequelize.
- **Sistema de Sessões**: Mantém histórico de conversas por token (Redis) e estado de autenticação do usuário.
- **Conversão de Markdown para HTML**: Utiliza uma segunda LLM para formatação, substituindo `\n` por `<p></p>`.
- **Frontend**: Páginas de `Login` e `Sign Up`, além do chat com envio de mensagens via Enter e renderização de HTML.

## Como Usar
1. **Clonar Repositório**:
   ```txt
   git clone https://github.com/CRFLuiz/alchembook-backend.git
   ```
2. **Instalar Dependências**:
   ```txt
   npm install
   ```
3. **Configurar .env**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```txt
   OPENROUTER_API_KEY=sua_chave_api_openrouter
   SESSION_SECRET=uma_chave_secreta_forte_e_aleatoria
   REDIS_URL=redis://localhost:6379 # Opcional, padrão é localhost:6379
   DB_USER=seu_usuario_postgres
   DB_PASSWORD=sua_senha_postgres
   DB_NAME=seu_banco_de_dados_postgres
   DB_HOST=localhost # Ou o host do seu container/servidor Postgres
   DB_PORT=5432 # Opcional, padrão é 5432
   ```
   Você pode usar o `.env.example` como base:
   ```txt
   cp .env.example .env
   ```
4. **Configurar e Iniciar Banco de Dados (PostgreSQL) e Redis**:
   Certifique-se de ter um servidor PostgreSQL e Redis rodando e acessíveis. Você pode usar `docker-compose` para isso.

5. **Executar Migrações e Seeders**:
   Para criar as tabelas no banco de dados e popular com dados iniciais (como um usuário administrador), execute:
   ```txt
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
   *   **Usuário inicial do seeder**: `email: admin@example.com`, `password: password123`

6. **Iniciar Servidor**:
   ```txt
   npm run dev
   ```
   ou
   ```txt
   node index.js
   ```
7. **Acessar Frontend**:
   - Página de Login: `http://localhost:3000/login.html`
   - Página de Sign Up: `http://localhost:3000/signup.html`
   - Página Principal (Chat): `http://localhost:3000` (Após login bem-sucedido)

## Diretrizes
- **Branches**: Utilizar `feature/_<nome>` para novas funcionalidades.
- **Commits**: Seguir formato `[TIPO] Descrição`.
- **Documentação**: Manter `gptme-knowledge` atualizado.

## Arquitetura
- **Backend**: Node.js, Express, OpenAI SDK.
- **Frontend**: HTML, CSS, JavaScript.
- **LLM**: OpenRouter para Project Manager e GPT-3.5-turbo para conversão de Markdown.

## Comandos Sequelize CLI

Os seguintes comandos `sequelize-cli` foram utilizados para configurar o banco de dados e os modelos:

1.  **Inicializar o Sequelize**:
    ```bash
    npx sequelize-cli init
    ```
    Este comando cria a estrutura básica do Sequelize no projeto, incluindo os diretórios `config`, `models`, `migrations` e `seeders`, além do arquivo de configuração `config/config.json`.

2.  **Gerar Modelo e Migração de Usuário**:
    ```bash
    npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
    ```
    Este comando gera dois arquivos:
    *   Um arquivo de modelo (`models/user.js`) que define a estrutura da tabela `Users` e suas associações.
    *   Um arquivo de migração (`migrations/<timestamp>-create-user.js`) que contém as instruções para criar a tabela `Users` no banco de dados.

3.  **Gerar Seeder de Usuários Iniciais**:
    ```bash
    npx sequelize-cli seed:generate --name initial-users
    ```
    Este comando cria um arquivo de seeder (`seeders/<timestamp>-initial-users.js`) que pode ser usado para popular o banco de dados com dados iniciais, como um usuário administrador.

### Próximos Passos (Execução de Migrações e Seeders)

Para aplicar as migrações e criar as tabelas no seu banco de dados PostgreSQL, você precisará executar o seguinte comando:

```bash
npx sequelize-cli db:migrate
```

Após a execução das migrações, para popular o banco de dados com os dados iniciais (ex: usuário administrador), execute o comando:

```bash
npx sequelize-cli db:seed:all
```
