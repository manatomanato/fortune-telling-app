import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: 'Prompt is required' });
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.choices || data.choices.length === 0) {
      res.status(500).json({ message: 'Error: No response from AI' });
      return;
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Error connecting to the API' });
  }
}
console.log("API Key:", process.env.OPENAI_API_KEY);
