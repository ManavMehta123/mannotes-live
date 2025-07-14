
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const { content } = req.body;
    const prompt = `Summarize the following in bullet points:\n\n${content}`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    res.status(200).json({ summary: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
