import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

const client = twilio(accountSid, authToken);

export const sendWhatsappMessage = async (to: string, body: string): Promise<void> => {
  try {
    const message = await client.messages.create({
      to: to,
      from: `whatsapp:+14155238886`,
      body,
    });
  } catch (error) {
    console.error(`Error sending message to ${to}: ${error}`);
  }
};

export const getWhatsappMessage = async (messageSid: string): Promise<any> => {
  try {
    const message = await client.messages(messageSid).fetch();
    return message;
  } catch (error) {
    console.error(`Error fetching message ${messageSid}: ${error}`);
    return '';
  }
};
