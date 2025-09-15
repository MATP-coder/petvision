import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only POST requests are allowed
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  }

  try {
    const { prompt, imageBase64, options } = (req.body as any) || {};
    // Validate at least one input
    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Missing input: prompt or imageBase64' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Choose model from options or fallback
    const modelName = options?.model || 'gemini-1.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    const contents: any[] = [];
    if (prompt) contents.push(prompt);
    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: options?.mimeType || 'image/jpeg',
          data: imageBase64,
        },
      });
    }

    const result = await model.generateContent(contents);
    const response = await result.response;

    // Return image if requested
    if (options?.responseType === 'image') {
      const candidates: any[] | undefined = (response as any)?.candidates;
      const imageData = candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return res.status(200).json({ result: imageData || null });
    }

    // Default: return text
    const text = (response as any)?.text?.();
    return res.status(200).json({ result: text ?? null });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: err?.message });
  }
}
