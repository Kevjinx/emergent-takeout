import askGPT from './askGPT.js';
import prompts from './prompts.js';

const test = async () => {
  const response = await askGPT(
    prompts.normalizeTitle('Director, Accounting and FP&A')
  );
  console.log(response);
};

test();
