# Diretrizes de Trabalho

1. **Linguagem Padrão**: O trabalho deve ser realizado em **JavaScript/Node.js**, a menos que seja explicitamente especificada outra linguagem.

2. **Contexto do Projeto**: Ao iniciar um trabalho, deve-se verificar se é um novo projeto ou um existente, listando/lendo arquivos de diretórios e subdiretórios. Em projetos existentes, ler todos os arquivos relevantes e suas dependências para completo entendimento.

3. **Compreensão Completa**: Não inventar funcionalidades ou estruturas. Ao receber uma solicitação, **ler todos os arquivos necessários** até obter total entendimento do contexto.  
   - **Exemplo**: Para adicionar um endpoint `/users`:  
     1. Ler `index.js` para identificar a pasta `routes`.  
     2. Listar arquivos em `routes` e localizar onde os endpoints de usuários são definidos.  
     3. Verificar a pasta `controllers` e ler o arquivo responsável por users (e.g., `userController.js`).  
     4. Analisar imports de `models` para entender a interação com o banco de dados.  
     5. Criar o novo model (se necessário), implementar a lógica no controller e definir a rota.  
     **Não presumir a estrutura** sem verificação completa.

4. **Padronização e Nomenclaturas**:  
   - **Projetos Existentes**:  
     - **Ler Arquivos Principais**: Identificar e seguir a padronização e nomenclaturas já adotadas.  
   - **Projetos Novos**:  
     - **Analisar Diretrizes**: Verificar regras de padronização e nomenclaturas.  
     - **Definir Padronização**: Se não houver regras, **criar uma padronização** e seguí-la consistentemente.  
   - **Objetivo**:  
     - Manter consistência no código.  
     - Facilitar manutenção e colaboração.

5. **Uso da Ferramenta Patch**:  
   - **Análise Pré-Patch**:  
     - Antes de aplicar um patch, **ler todo o conteúdo do arquivo** para entender o contexto e identificar a seção específica a ser modificada.  
   - **Bloco de Código Único**:  
     - Criar um **patch minimalista** que altere apenas a parte necessária, evitando blocos grandes ou repetitivos.  
   - **Objetivo**:  
     - Reduzir o consumo de tokens e tempo de processamento.  
     - Garantir patches precisos e eficientes.

6. **Documentação de Processo**:  
   - **Requisição da Tarefa**:  
     - O usuário pode solicitar tarefas diretamente aqui ou via arquivo `.md` (e.g., `requests.md` ou `_gptme_requests.md`). Caso o nome do arquivo não seja especificado, considerar esses nomes por padrão.  
   - **Análise Prévia**:  
     - **Sempre** analisar código, arquivos e estrutura **antes** de iniciar qualquer desenvolvimento.  
   - **Documentação de Passos**:  
     - Criar `_gptme_steps.md` para descrever **todos os passos necessários** para resolver a tarefa.  
   - **Validação de Passos**:  
     - Solicitar validação do usuário para os passos documentados.  
   - **Planejamento de Tarefas**:  
     - Após validação, criar `_gptme_pm.md` para dividir tarefas em sub-tarefas com os seguintes marcadores:  
       - `[ ]` Não concluída  
       - `[x]` Concluída  
       - `[/]` Paused (iniciada mas interrompida)  
       - `[-]` Falha (não foi possível concluir)  
   - **Relatório de Execução**:  
     - Criar `_gptme_description.md` para registrar:  
       - O que foi feito.  
       - Quais arquivos foram modificados.  
     - **Atualizar** esse arquivo **a cada nova tarefa**, acrescentando novos relatórios.  
   - **Reset de Arquivos Auxiliares**:  
     - **Sempre** que um novo trabalho for iniciado, verificar se os arquivos `_gptme_steps.md`, `_gptme_pm.md` e `_gptme_description.md` existem.  
     - **Apagar todo o conteúdo antigo** desses arquivos para evitar informações residuais.  
   - **Início do Trabalho**:  
     - Somente após a validação do usuário e reset dos arquivos, iniciar a execução das tarefas.

7. **Conhecimento do Projeto**:  
   - **Identificação do Projeto**:  
     - O nome do projeto é derivado do nome da pasta atual (e.g., `alchembook-backend`).  
   - **Documentação de Conhecimento**:  
     - Verificar a pasta `gptme-knowledge` para encontrar um arquivo `.md` com o nome do projeto (e.g., `alchembook-backend.md`).  
     - **Caso exista**: Ler o arquivo **antes** de iniciar qualquer análise ou desenvolvimento.  
     - **Caso não exista**:  
       1. Criá-lo **assim que** adquirir conhecimento suficiente sobre o projeto.  
       2. **Atualizá-lo** sempre que novo entendimento for alcançado.  
   - **Objetivo**: Manter o documento `gptme-knowledge/[NOME_DO_PROJETO].md` como fonte de verdade para a arquitetura, fluxos e decisões técnicas do projeto.

8. **Verificação Pós-Tarefa**:  
   - **Revisão Final**:  
     - Após concluir uma tarefa, **revisar todos os arquivos editados** para garantir:  
       - Corretude da implementação.  
       - Alinhamento com as diretrizes e requisitos.  
   - **Marcação de Status**:  
     - **Somente após a verificação**, atualizar o `_gptme_pm.md` com o status adequado:  
       - `[x]` Concluída (funciona como esperado).  
       - `[/]` Paused (parcialmente implementada ou dependências pendentes).  
       - `[-]` Falha (problemas não resolvidos ou requisitos não atendidos).  
   - **Registro de Verificação**:  
     - Incluir detalhes da verificação no `_gptme_description.md`, destacando:  
       - Testes realizados.  
       - Itens validados.  
       - Pontos críticos ou pendências (se houver).

9. **Interações Git**:  
   - **Solicitação Explícita**:  
     - As interações Git (commit, push, PR) devem ser realizadas **apenas se explicitamente solicitadas pelo usuário**, com exceção da Regra 3 de Versionamento e Backup.  
   - **Exceção**:  
     - A Regra 3 (Versionamento e Backup) está isenta e deve ser sempre seguida.  
   - **Objetivo**:  
     - Evitar operações Git desnecessárias sem consentimento do usuário.  
     - Garantir conformidade com as instruções do usuário.  

10. **Mensagem de Commit**:  
   - **Revisão Pré-Commit**:  
     - Antes de commitar, **verificar todos os arquivos modificados** para garantir:  
       - Alterações necessárias e intencionais.  
       - Ausência de debug logs ou código comentado desnecessário.  
   - **Formato de Commit**:  
     - Criar uma mensagem clara e concisa no formato:  
       - `[ESCOPO] DESCRIÇÃO` (ex.: `[FEAT] Adicionar endpoint de usuários`).  
     - **Exemplo**:  
       ```bash
       git commit -m "[FEAT] Implementar endpoint de cadastro de usuários"
       ```  
   - **Objetivo**:  
     - Facilitar o entendimento das alterações via histórico de commits.  
     - Garantir rastreabilidade e manutenção do código.

11. **Pull Request (PR)**:  
   - **Revisão de Diferenças**:  
     - Antes de criar a PR, **analisar o diff de código** entre as branches para garantir:  
       - Alterações alinhadas com a tarefa.  
       - Não há mudanças indesejadas ou não relacionadas.  
   - **Título e Descrição**:  
     - **Título**: Curto e descritivo (ex.: `[FEAT] Adicionar endpoint de cadastro`).  
     - **Descrição**:  
       - **Alterações**: O que foi adicionado, removido ou modificado.  
       - **Motivação**: Por que as alterações foram necessárias.  
       - **Funcionalidade**: O que as mudanças fazem (ex.: "Permite cadastro de usuários").  
       - **Testes**: Passos para o usuário testar a implementação (ex.: "Acesse `/users/register` e preencha o formulário").  
   - **Exemplo de Descrição**:  
     ```markdown
     **Alterações**:  
     - Adicionado endpoint `/users/register` no `userController.js`.  
     - Criado model `User.js` para interação com o banco de dados.  
     - Atualizado arquivo `routes.js` para mapear a nova rota.  

     **Motivação**:  
     Implementação necessária para permitir cadastro de usuários no sistema.  

     **Funcionalidade**:  
     O endpoint `/users/register` recebe dados via POST, valida-os e cria um novo usuário no banco.  

     **Testes**:  
     1. Envie um request `POST` para `/users/register` com:  
        ```json
        { "name": "John Doe", "email": "john@example.com", "password": "123456" }
        ```  
     2. Verifique se o usuário é criado no banco e se a resposta retorna status 201.  
     ```  
   - **Objetivo**:  
     - Garantir PRs claras, autoexplicativas e testáveis.  
     - Facilitar a revisão e merge de código.

12. **Versionamento e Backup**:  
   - **Verificação do Provedor Git**:  
     - **Caso o projeto esteja em um provedor Git (ex.: GitHub, GitLab, Bitbucket)**:  
       1. **Verificar alterações não commitadas**:  
          - Se houver arquivos não adicionados (add), não commitados ou não pushados, **notificar o usuário** e **aguardar solução** antes de prosseguir.  
          - **Exemplo de Notificação**:  
            > "Há alterações não commitadas. Por favor, forneça instruções sobre como proceder."  
       2. Criar uma branch com nome `feature/_<NOME_DO_TRABALHO>` (ex.: `feature/_add-user-endpoint`).  
       3. Desenvolver as alterações nessa branch.  
     - **Caso o projeto NÃO esteja em um provedor Git**:  
       1. Copiar a pasta do projeto para um local seguro, **excluindo pastas desnecessárias** (ex.: `node_modules`).  
       2. Criar um arquivo `_gptme_bkps.md` no diretório raiz do projeto com o caminho do backup (ex.: `/backups/alchembook-backend_20250607`).  
   - **Objetivo**:  
     - Garantir organização e rastreabilidade do código.  
     - Evitar perda de alterações ou contaminação de ambientes.  
   - **Procedimento para Alterações Pendentes**:  
     - **Insistência na Solução**:  
       - Se o usuário não fornecer uma solução, **repetir a notificação** até que o problema seja resolvido.  
       - **Exemplo de Insistência**:  
         > "Não posso prosseguir sem resolver as alterações pendentes. Por favor, instrua como proceder."

13. **Criação de Regras**:  
   - **Agrupamento Existente**:  
     - Antes de adicionar uma nova regra, **verificar se ela se encaixa em um agrupamento existente** (ex.: Desenvolvimento, Documentação, Git).  
   - **Criação de Novo Agrupamento**:  
     - Se não houver um agrupamento adequado, **criar um novo** com um título de **uma palavra** (ex.: "Estrutura", "Processo").  
   - **Objetivo**:  
     - Manter as diretrizes organizadas e fáceis de navegar.  
     - Garantir que as regras sejam categorizadas de forma lógica e consistente.

14. **Numeração Sequencial**:  
   - **Adição de Regras**:  
     - **Sempre** inserir novas regras **após as existentes** no mesmo agrupamento, utilizando a numeração subsequente.  
   - **Proibição de Inserção Anterior**:  
     - **Nunca** adicionar uma regra **antes de uma já existente**.  
   - **Objetivo**:  
     - Manter a ordem cronológica e a estrutura lógica das diretrizes.  
     - Facilitar a navegação e referência às regras.

15. **Padrão de Codificação**:  
   - **Comentários e Nomes**:  
     - **Sempre** declarar comentários, funções e variáveis **em inglês**, independentemente do idioma do projeto.  
   - **Objetivo**:  
     - Padronizar a nomenclatura e documentação.  
     - Facilitar a colaboração em equipes multilíngues.

16. **Referência a Regras**:  
   - **Formato de Referência**:  
     - Sempre que uma regra for mencionada, utilizar o formato:  
       - **Título.Numero_do_Tópico** (ex.: **Desenvolvimento.3**, **Documentação.15**, **Verificação.1**, **Git.2**).  
     - Isso significa que os próximos títulos que entrarem nas regras deverão conter apenas uma palavra sempre que possível.
   - **Objetivo**:  
     - Facilitar a referência clara e consistente às regras.  
     - Evitar ambiguidades na comunicação.

17. **Idioma de Resposta**:  
   - **Alinhamento com o Usuário**:  
     - **Sempre** responder no idioma utilizado pelo usuário na interação atual.  
   - **Objetivo**:  
     - Garantir comunicação clara e respeito à preferência do usuário.
