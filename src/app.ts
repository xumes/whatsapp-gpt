import { sendWhatsappMessage, getWhatsappMessage } from './services/twilio';
import { getOpenAICompletion } from './services/openai';

// example usage
const sendMessage = async (to: string, body: string): Promise<void> => {
  await sendWhatsappMessage(to, body);
};

const receiveMessage = async (messageSid: string): Promise<void> => {
  const message = await getWhatsappMessage(messageSid);
  const completion = await getOpenAICompletion(message);
  await sendWhatsappMessage(message.from, completion);
};

sendMessage('+19024710482', 'Hello, World!');
receiveMessage('SMf6866e11f5ca3f785043811101f9a6cd');
