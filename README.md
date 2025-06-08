# Alchembook Backend

## Descrição
API Node.js para gerenciamento de criação de eBooks, integrando um Project Manager baseado em LLM via OpenRouter.

## Funcionalidades
- **Endpoint `/chat`**: Interage com o Project Manager para criar eBooks.
- **Sistema de Sessões**: Mantém histórico de conversas por token.
- **Frontend Integrado**: Chat simples para testes.

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
