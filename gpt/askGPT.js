import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const askGPT = async (prompt) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 300,
    temperature: 0,
  });
  console.log(response);
  return response.data.choices[0].text;
};

export default askGPT;
