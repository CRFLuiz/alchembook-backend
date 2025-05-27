const fs = require('fs');
const path = require('path');
const LLM = require('./src/controllers/OpenRouterLLM');
const { v1_1: prompt } = require('./src/prompts/CCO.DraLauraMendes');
const freeModels = [
    'mistralai/devstral-small:free',
    'google/gemma-3n-e4b-it:free',

    'meta-llama/llama-3.3-8b-instruct:free',
    'nousresearch/deephermes-3-mistral-24b-preview:free',
    'microsoft/phi-4-reasoning-plus:free',
    'microsoft/phi-4-reasoning:free',
    'opengvlab/internvl3-14b:free',
    'opengvlab/internvl3-2b:free',
    'deepseek/deepseek-prover-v2:free',
    'qwen/qwen3-30b-a3b:free',
    'qwen/qwen3-8b:free',
    'qwen/qwen3-14b:free',
    'qwen/qwen3-32b:free',
    'qwen/qwen3-235b-a22b:free',
    'tngtech/deepseek-r1t-chimera:free',
    'microsoft/mai-ds-r1:free',
    'thudm/glm-z1-32b:free',
    'thudm/glm-4-32b:free',
    'shisa-ai/shisa-v2-llama3.3-70b:free',
    'arliai/qwq-32b-arliai-rpr-v1:free',
    'agentica-org/deepcoder-14b-preview:free',
    'moonshotai/kimi-vl-a3b-thinking:free',
    'nvidia/llama-3.3-nemotron-super-49b-v1:free',
    'nvidia/llama-3.1-nemotron-ultra-253b-v1:free',
    'meta-llama/llama-4-maverick:free',
    'meta-llama/llama-4-scout:free',
    'deepseek/deepseek-v3-base:free',
    'qwen/qwen2.5-vl-3b-instruct:free',
    'google/gemini-2.5-pro-exp-03-25',
    'qwen/qwen2.5-vl-32b-instruct:free',
    'deepseek/deepseek-chat-v3-0324:free',
    'featherless/qwerky-72b:free',
    'mistralai/mistral-small-3.1-24b-instruct:free',
    'open-r1/olympiccoder-32b:free',
    'google/gemma-3-1b-it:free',
    'google/gemma-3-4b-it:free',
    'google/gemma-3-12b-it:free',
    'rekaai/reka-flash-3:free',
    'google/gemma-3-27b-it:free',
    'deepseek/deepseek-r1-zero:free',
    'qwen/qwq-32b:free',
    'moonshotai/moonlight-16b-a3b-instruct:free',
    'nousresearch/deephermes-3-llama-3-8b-preview:free',
    'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
    'cognitivecomputations/dolphin3.0-mistral-24b:free',
    'qwen/qwen2.5-vl-72b-instruct:free',
    'mistralai/mistral-small-24b-instruct-2501:free',
    'deepseek/deepseek-r1-distill-qwen-32b:free',
    'deepseek/deepseek-r1-distill-qwen-14b:free',
    'deepseek/deepseek-r1-distill-llama-70b:free',
    'deepseek/deepseek-r1:free',
    'deepseek/deepseek-chat:free',
    'google/gemini-2.0-flash-exp:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'qwen/qwen-2.5-7b-instruct:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'meta-llama/llama-3.2-1b-instruct:free',
    'meta-llama/llama-3.2-11b-vision-instruct:free',
    'qwen/qwen-2.5-72b-instruct:free',
    'qwen/qwen-2.5-vl-7b-instruct:free',
    'meta-llama/llama-3.1-405b:free',
    'meta-llama/llama-3.1-8b-instruct:free',
    'mistralai/mistral-nemo:free',
    'google/gemma-2-9b-it:free',
    'mistralai/mistral-7b-instruct:free',
]

// async function testModelsParallel(folderName, message, prompt) {
//     // Cria a pasta se não existir
//     const resultsDir = path.resolve(__dirname,`./public/test-results/${folderName}`);
//     console.log('Results directory:', resultsDir);
//     if (!fs.existsSync(resultsDir)) {
//         fs.mkdirSync(resultsDir, { recursive: true });
//     }

//     // Cria um array de promises para todos os modelos
//     const testPromises = freeModels.map(async (model) => {
//         try {
//             console.log('Testing model: ', model);
//             const start = new Date();
//             const llm = new LLM({ model, systemPrompt: prompt });
//             const modelResponse = await llm.talk(message);
//             const end = new Date();
            
//             const timeTaken = end - start;
//             console.log('Model response in: ', timeTaken, 'ms (', timeTaken / 1000, 's)');
//             console.log('-');
            
//             // Salva cada resposta em um arquivo .md separado
//             const fileName = `${model.replace(/\//g, '_').replace(/:/g, '_')}.md`;
//             const filePath = `${resultsDir}/${fileName}`;
            
//             const content = `# Model: ${model}\n` +
//                            `# Time: ${timeTaken}ms (${timeTaken/1000}s)\n\n` +
//                            `${modelResponse}`;
            
//             fs.writeFileSync(filePath, content);
            
//             return { 
//                 model, 
//                 status: 'success', 
//                 timeTaken,
//                 filePath 
//             };
//         } catch (error) {
//             console.log('Error with model: ', model);
//             console.log('Error: ', error);
//             console.log('-');
            
//             return { 
//                 model, 
//                 status: 'error', 
//                 error: error.message 
//             };
//         }
//     });

//     // Executa todos os testes em paralelo
//     const results = await Promise.all(testPromises);
    
//     // Gera um relatório resumido em JSON
//     const summary = {
//         folderName,
//         createdAt: new Date().toISOString(),
//         message,
//         prompt,
//         totalModels: freeModels.length,
//         successful: results.filter(r => r.status === 'success').length,
//         failed: results.filter(r => r.status === 'error').length,
//         results: results.map(r => ({
//             model: r.model,
//             status: r.status,
//             ...(r.status === 'success' ? { timeTaken: r.timeTaken, filePath: r.filePath } : { error: r.error })
//         }))
//     };

//     // Salva o relatório resumido
//     const summaryPath = `${resultsDir}/summary.json`;
//     fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 4));
    
//     console.log('Message:', message, '\nPrompt:', prompt);
//     console.log(`Results saved to: ${resultsDir}`);
//     console.log(`Summary saved to: ${summaryPath}`);
//     console.log('# ================================= #');
    
//     return {
//         resultsDir,
//         summaryPath,
//         summary
//     };
// }

// Exemplo de uso

// async function testModelsParallel(folderName, message, prompt) {
//     // Cria a pasta se não existir
//     const resultsDir = path.resolve(__dirname, `./public/test-results/${folderName}`);
//     console.log('Results directory:', resultsDir);
//     if (!fs.existsSync(resultsDir)) {
//         fs.mkdirSync(resultsDir, { recursive: true });
//     }

//     // Configurações do rate limiting
//     const MAX_REQUESTS_PER_MINUTE = 20;
//     const REQUEST_INTERVAL = 60000 / MAX_REQUESTS_PER_MINUTE; // 3000ms = 3 segundos entre requests
//     let activeRequests = 0;
//     let lastRequestTime = 0;

//     // Função para controlar o rate limiting
//     async function rateLimitedLLMCall(model, message, prompt) {
//         const now = Date.now();
//         const timeSinceLastRequest = now - lastRequestTime;
        
//         // Se ainda não passou tempo suficiente desde a última requisição, espera
//         if (timeSinceLastRequest < REQUEST_INTERVAL && activeRequests >= MAX_REQUESTS_PER_MINUTE) {
//             const waitTime = REQUEST_INTERVAL - timeSinceLastRequest;
//             console.log(`Rate limit reached. Waiting ${waitTime}ms before next request...`);
//             await new Promise(resolve => setTimeout(resolve, waitTime));
//         }

//         activeRequests++;
//         lastRequestTime = Date.now();
        
//         try {
//             const llm = new LLM({ model, systemPrompt: prompt });
//             const response = await llm.talk(message);
//             return response;
//         } finally {
//             activeRequests--;
//         }
//     }

//     // Executa os testes em batches controlados
//     const results = [];
//     const batchSize = MAX_REQUESTS_PER_MINUTE;
    
//     for (let i = 0; i < freeModels.length; i += batchSize) {
//         const batch = freeModels.slice(i, i + batchSize);
//         console.log(`Processing batch ${i/batchSize + 1} of ${Math.ceil(freeModels.length/batchSize)}`);
        
//         const batchResults = await Promise.all(batch.map(async (model) => {
//             try {
//                 console.log('Testing model: ', model);
//                 const start = new Date();
//                 const modelResponse = await rateLimitedLLMCall(model, message, prompt);
//                 const end = new Date();
                
//                 const timeTaken = end - start;
//                 console.log('Model response in: ', timeTaken, 'ms (', timeTaken / 1000, 's)');
//                 console.log('-');
                
//                 // Salva cada resposta em um arquivo .md separado
//                 const fileName = `${model.replace(/\//g, '_').replace(/:/g, '_')}.md`;
//                 const filePath = `${resultsDir}/${fileName}`;
                
//                 const content = `# Model: ${model}\n` +
//                                `# Time: ${timeTaken}ms (${timeTaken/1000}s)\n\n` +
//                                `${modelResponse}`;
                
//                 fs.writeFileSync(filePath, content);
                
//                 return { 
//                     model, 
//                     status: 'success', 
//                     timeTaken,
//                     filePath 
//                 };
//             } catch (error) {
//                 console.log('Error with model: ', model);
//                 console.log('Error: ', error.message);
//                 console.log('-');
                
//                 return { 
//                     model, 
//                     status: 'error', 
//                     error: error.message 
//                 };
//             }
//         }));

//         results.push(...batchResults);
        
//         // Espera 1 minuto antes do próximo batch (exceto no último batch)
//         if (i + batchSize < freeModels.length) {
//             console.log(`Batch completed. Waiting 1 minute before next batch...`);
//             await new Promise(resolve => setTimeout(resolve, 60000));
//         }
//     }

//     // Gera um relatório resumido em JSON
//     const summary = {
//         folderName,
//         createdAt: new Date().toISOString(),
//         message,
//         prompt,
//         totalModels: freeModels.length,
//         successful: results.filter(r => r.status === 'success').length,
//         failed: results.filter(r => r.status === 'error').length,
//         results: results.map(r => ({
//             model: r.model,
//             status: r.status,
//             ...(r.status === 'success' ? { timeTaken: r.timeTaken, filePath: r.filePath } : { error: r.error })
//         }))
//     };

//     // Salva o relatório resumido
//     const summaryPath = `${resultsDir}/summary.json`;
//     fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 4));
    
//     console.log('Message:', message, '\nPrompt:', prompt);
//     console.log(`Results saved to: ${resultsDir}`);
//     console.log(`Summary saved to: ${summaryPath}`);
//     console.log('# ================================= #');
    
//     return {
//         resultsDir,
//         summaryPath,
//         summary
//     };
// }

async function testModelsParallel(folderName, message, prompt) {
    // Cria a pasta se não existir
    const resultsDir = path.resolve(__dirname, `./src/public/test-results/${folderName}`);
    console.log('Results directory:', resultsDir);
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    // Configurações do rate limiting
    const MAX_REQUESTS_PER_MINUTE = 20;
    const REQUEST_INTERVAL = 60000 / MAX_REQUESTS_PER_MINUTE; // 3 segundos entre requests (60000/20)
    const results = [];

    // Função para processar um modelo com delay controlado
    async function processModelWithDelay(model, index) {
        try {
            console.log(`[${index + 1}/${freeModels.length}] Testing model:`, model);
            const start = new Date();
            const llm = new LLM({ model, systemPrompt: prompt });
            const modelResponse = await llm.talk(message);
            const end = new Date();
            
            const timeTaken = end - start;
            console.log('Model response in:', timeTaken, 'ms (', timeTaken / 1000, 's)');
            console.log('-');
            
            // Salva cada resposta em um arquivo .md separado
            const fileName = `${model.replace(/\//g, '_').replace(/:/g, '_')}.md`;
            const filePath = `${resultsDir}/${fileName}`;
            
            const content = `# Model: ${model}\n` +
                           `# Time: ${timeTaken}ms (${timeTaken/1000}s)\n\n` +
                           `${modelResponse}`;
            
            fs.writeFileSync(filePath, content);
            
            return { 
                model, 
                status: 'success', 
                timeTaken,
                filePath 
            };
        } catch (error) {
            console.log('Error with model:', model);
            console.log('Error:', error.message);
            console.log('-');
            
            return { 
                model, 
                status: 'error', 
                error: error.message 
            };
        }
    }

    // Processa cada modelo sequencialmente com intervalo controlado
    for (let i = 0; i < freeModels.length; i++) {
        const startTime = Date.now();
        
        const result = await processModelWithDelay(freeModels[i], i);
        results.push(result);
        
        // Aplica o delay entre requests (exceto após o último)
        if (i < freeModels.length - 1) {
            const elapsed = Date.now() - startTime;
            const waitTime = Math.max(0, REQUEST_INTERVAL - elapsed);
            
            if (waitTime > 0) {
                console.log(`Waiting ${waitTime}ms before next request...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }

    // Gera um relatório resumido em JSON
    const summary = {
        folderName,
        createdAt: new Date().toISOString(),
        message,
        prompt,
        totalModels: freeModels.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length,
        results: results.map(r => ({
            model: r.model,
            status: r.status,
            ...(r.status === 'success' ? { timeTaken: r.timeTaken, filePath: r.filePath } : { error: r.error })
        }))
    };

    // Salva o relatório resumido
    const summaryPath = `${resultsDir}/summary.json`;
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 4));
    
    console.log('Message:', message, '\nPrompt:', prompt);
    console.log(`Results saved to: ${resultsDir}`);
    console.log(`Summary saved to: ${summaryPath}`);
    console.log('# ================================= #');
    
    return {
        resultsDir,
        summaryPath,
        summary
    };
}

// testModelsParallel(
//     "meu-teste-surf", // Nome da pasta para os resultados
//     "Quero criar dois ebooks sobre surf...", // Mensagem
//     "Você é um assistente especializado em criação de conteúdo" // Prompt do sistema
// );

testModelsParallel(
    "ebook-js",
    `Preciso de um ebook avançado sobre **otimização de Node.js em AWS Lambda**. Foco em:  
- Reduzir cold starts (já usei SnapStart, mas quero ir além).  
- Gerenciar conexões de banco de dados (pooling vs. reinicialização).  
- **Não quero** basics de JavaScript ou configuração inicial de Lambda.  
- Preciso de exemplos reais com métricas.  
Me ajude a estruturar isso.`,
    prompt
);