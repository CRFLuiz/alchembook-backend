# Alchembook Backend

## Descrição
API Node.js para gerenciamento de criação de eBooks, integrando um Project Manager baseado em LLM via OpenRouter. O projeto inclui um frontend simples para interação.

## Funcionalidades
- **Endpoint `/chat`**: Interage com o Project Manager para criar eBooks.
- **Sistema de Sessões**: Mantém histórico de conversas por token.
- **Conversão de Markdown para HTML**: Utiliza uma segunda LLM para formatação, substituindo `\n` por `<p></p>`.
- **Frontend**: Chat com envio de mensagens via Enter e renderização de HTML.

## Como Usar
1. **Clonar Repositório**:
   ```bash
   git clone https://github.com/CRFLuiz/alchembook-backend.git
   ```
2. **Instalar Dependências**:
   ```bash
   npm install
   ```
3. **Configurar .env**:
   ```bash
   cp .env.example .env
   ```
4. **Iniciar Servidor**:
   ```bash
   node index.js
   ```
5. **Acessar Frontend**:
   - URL: `http://34.217.15.78:3000`

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
