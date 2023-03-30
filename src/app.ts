import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sendWhatsappMessage } from './services/twilio';
import { getOpenAICompletion } from './services/openai';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/chat/send', async (req: Request, res: Response) => {
  const { to, body } = req.body;
  try {
    await sendWhatsappMessage(to, body);
    console.log("sending", body)
    res.status(200).send({ success: true, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/chat/receive', async (req: Request, res: Response) => {
  const twilioRequestBody = req.body;
  const messageBody = twilioRequestBody.Body;

  console.log("messageBody", messageBody)

  try {
    const completion = await getOpenAICompletion(messageBody);
    await sendWhatsappMessage(twilioRequestBody.from, completion);
    console.log("sending back", completion)
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
