import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Choice {
  text: string;
}

interface CreateChatCompletionResponseChoicesInner {
  message: string;
  index: number;
  finish_reason: string;
  logprobs: any;
  text: string;
  choice: Choice;
}

interface CreateChatCompletionResponseChoices {
  index: string;
  message: {
    role: string,
    content: string
  }
}

interface CreateChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  usage: object;
  choices: CreateChatCompletionResponseChoices[];
}

export const getOpenAICompletion = async (input: string): Promise<string> => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: input}],
      max_tokens: 2048,
      temperature: 0.5,
      n: 1,
      stop: ["\n"]
    });

    return completion.data.choices[0].message?.content as string
  } catch (error) {
    console.error(`Error completing input: ${error}`);
    return '';
  }
};
