import { openai_ } from './openai.js';

export const INITIAL_SESSION = {
  messages: [],
};

export async function initCommand(ctx) {
  ctx.session = INITIAL_SESSION;
  await ctx.reply('Жду вашего голосового или текстового сообщения');
}

export async function processTextToChat(ctx, content) {
  try {
    ctx.session.messages.push({ role: openai_.roles.USER, content });

    const response = await openai_.chat_(ctx.session.messages);

    ctx.session.messages.push({
      role: openai_.roles.ASSISTANT,
      content: response.content,
    });

    await ctx.reply(response.content);
  } catch (e) {
    console.log('Error while proccesing text to gpt', e.message);
  }
}
