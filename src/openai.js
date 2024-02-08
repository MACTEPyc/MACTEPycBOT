import OpenAI from 'openai';
// import config from 'config'
import { createReadStream } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

class OpenAIforBot {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  };

  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.proxyapi.ru/openai/v1',
    });
  }

  async chat_(messages) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
      });
      return response.choices[0].message;
    } catch (e) {
      console.log('Error while gpt chat', e.message);
    }
  }

  async transcription_(filepath) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: createReadStream(filepath),
      });
      // console.log(response);
      return response.text;
    } catch (e) {
      console.log('Error while transcription', e.message);
    }
  }
}

export const openai_ = new OpenAIforBot(process.env.OPENAI_KEY);
