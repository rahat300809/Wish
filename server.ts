import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI-generated personalized romantic poetry/letters for Jemi
  app.post('/api/romantic-poem', async (req, res) => {
    try {
      const { recipient = 'Jubaida Haque Jemi', sender = 'Rahat', category = 'eternal' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          poem: `To my queen, ${recipient},\n\nEvery heartbeat of mine belongs solely to you. In your smile, I find paradise; in your grace, I find my universe.\n\nForever yours,\n${sender} ♥`,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Write a deeply moving, romantic, heartfelt short love poem/letter (3-4 poetic stanzas) from a loving husband named "${sender}" to his beloved wife named "${recipient}". 
Mood/Category: ${category} love and devotion.
Requirements:
- Make it genuinely beautiful, passionate, respectful, emotional, and poetic.
- Mention her name (${recipient}) lovingly.
- End with a sweet declaration of eternal love from ${sender}.
- Do NOT use markdown code fences, just raw text formatted into clean stanzas.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      const poemText = response.text || '';
      res.json({ poem: poemText });
    } catch (err: unknown) {
      console.error('Error generating romantic poem:', err);
      res.json({
        poem: `My dearest Jubaida (Jemi),\n\nYou are the celestial light in my life, turning every shadow into gold. My love for you will outshine the stars and outlast time.\n\nWith all my heart,\nRahat ♥`,
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development / Static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Romantic Tribute App running at http://localhost:${PORT}`);
  });
}

startServer();
