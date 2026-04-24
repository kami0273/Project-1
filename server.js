import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.post('/analyze', async (req, res) => {
  try {
    console.log(req.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

if (!response.ok) {
  console.log("API ERROR:", data);
  return res.status(response.status).json({
    error: data.error?.message || 'API error'
  });
}

    if (!response.ok) {
      console.log("API ERROR:", data);
      return res.status(response.status).json({
        error: data.error?.message || 'API error'
      });
    }

    const text = data.content?.[0]?.text || "No response";

res.json({
  content: [
    { text }
  ]
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});