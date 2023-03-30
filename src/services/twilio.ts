import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

const client = twilio(accountSid, authToken);

export const sendWhatsappMessage = async (to: string, body: string): Promise<void> => {
  console.log("to", to)
  try {
    const message = await client.messages.create({
      to: `whatsapp:${to}`,
      from: `whatsapp:+14155238886`,
      body,
    });
    console.log(`Message sent to ${to}: ${message.sid}`);
  } catch (error) {
    console.error(`Error sending message to ${to}: ${error}`);
  }
};

export const getWhatsappMessage = async (messageSid: string): Promise<any> => {
  try {
    const message = await client.messages(messageSid).fetch();
    console.log(`Message received from ${message.from}: ${message.body}`);
    return message;
  } catch (error) {
    console.error(`Error fetching message ${messageSid}: ${error}`);
    return '';
  }
};
