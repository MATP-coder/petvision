import { ImageAnalysisResult } from '../types';

// Analyse the quality of a pet image using the serverless API.
export async function analyzeImageQuality(
  base64Image: string,
  mimeType: string,
): Promise<ImageAnalysisResult> {
  // Prompt instructs Gemini to assess image suitability and return a JSON object.
  const prompt =
    'Analysiere das bereitgestellte Bild eines Haustieres auf seine Eignung zur Erstellung hochwertiger Kunstwerke. Pr\u00fcfe auf: Unsch\u00e4rfe, schlechte Beleuchtung, unzureichenden Bildausschnitt (z.\u00a0B. nur ein Teil des Tieres) oder andere Probleme, die eine Verwendung als Kunstvorlage erschweren k\u00f6nnten. Antworte mit einer JSON-Antwort mit den Feldern "isSuitable" (bool), "feedback" (string).';

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        imageBase64: base64Image,
        options: {
          mimeType,
          model: 'gemini-2.5-flash',
          responseType: 'text',
        },
      }),
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();
    // Parse the returned JSON string into an object.
    return JSON.parse((data?.result ?? '').trim()) as ImageAnalysisResult;
  } catch (error) {
    console.error('Error analyzing image quality:', error);
    return {
      isSuitable: true,
      feedback: 'Bild konnte nicht analysiert werden, fahre trotzdem fort.',
    };
  }
}

// Generate stylized pet artwork via the serverless API.
export async function generatePetArt(
  base64Image: string,
  mimeType: string,
  prompt: string,
): Promise<string> {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        imageBase64: base64Image,
        options: {
          mimeType,
          model: 'gemini-2.5-flash-image-preview',
          responseType: 'image',
        },
      }),
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();
    // Return the base64-encoded image data.
    return data.result as string;
  } catch (error) {
    console.error('Error generating pet art:', error);
    throw new Error('Failed to generate artwork. Please try again.');
  }
}
