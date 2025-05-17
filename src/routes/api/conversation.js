const fs = require('fs');
const router = require('express').Router();
const LLM = require('../../controllers/OpenRouterLLM');
const freeModels = [
    'meta-llama/llama-3.3-8b-instruct:free',
    'nousresearch/deephermes-3-mistral-24b-preview:free',
    'microsoft/phi-4-reasoning-plus:free',
    'microsoft/phi-4-reasoning:free',
    'qwen/qwen3-0.6b-04-28:free',
    'qwen/qwen3-1.7b:free',
    'qwen/qwen3-4b:free',
    'opengvlab/internvl3-14b:free',
    'deepseek/deepseek-prover-v2:free',
    'qwen/qwen3-30b-a3b:free',
    'qwen/qwen3-8b:free',
    'qwen/qwen3-14b:free',
    'qwen/qwen3-32b:free',
    'qwen/qwen3-235b-a22b:free',
    'tngtech/deepseek-r1t-chimera:free',
    'thudm/glm-z1-9b:free',
    'thudm/glm-4-9b:free',
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
    'bytedance-research/ui-tars-72b:free',
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

router.post('/talk/:model_id', async (req, res) => {
    const { message, prompt } = req.body;
    if (!message) {
        return res.status(400).json({ ok: false, error: 'Message is required' });
    }
    const llm = new LLM({ model: freeModels[parseInt(req.params.model_id)], systemPrompt: prompt });
    const response = await llm.talk(message);
    res.status(200).json({ ok: true, response });
});

router.post('/test-free-models', async (req, res) => {console.log(freeModels.length, ' models able');
    const { message, prompt } = req.body;
    if (!message) {
        return res.status(400).json({ ok: false, error: 'Message is required' });
    }
    console.log('Testing with the message: ', message);
    console.log('');
    console.log('and the prompt: ', prompt);
    console.log('# ================================= #')
    const response = [];
    for(let i = 0; i < freeModels.length; i++){
        try{
            console.log('Testing model: ', freeModels[i]);
            const start = new Date();
            const llm = new LLM({ model: freeModels[i], systemPrompt: prompt });
            const modelResponse = await llm.talk(message);
            const end = new Date();
            console.log('Model response in: ', end - start, 'ms (', (end - start) / 1000, 's)');
            response.push({ model: freeModels[i], modelResponse, ms: end - start, s: (end - start) / 1000 });
            console.log('-')
        }catch(error){
            response.push({ model: freeModels[i], error, ms: end - start, s: (end - start) / 1000 });
            console.log('Error with model: ', freeModels[i]);
            console.log('Error: ', error);
            console.log('-')
        }
    }
    fs.writeFileSync(`./public/test-results.${new Date()}.json`, JSON.stringify(response, null, 4));
    res.status(200).json({ ok: true, response });
});

module.exports = router;