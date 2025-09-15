import { GoogleGenAI, Modality, GenerateContentResponse, Type } from "@google/genai";
import { ImageAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeImageQuality = async (
  base64Image: string,
  mimeType: string
): Promise<ImageAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Analysiere das bereitgestellte Bild eines Haustieres auf seine Eignung zur Erstellung hochwertiger Kunstwerke. Prüfe auf: Unschärfe, schlechte Beleuchtung, Hindernisse, Entfernung und Klarheit des Tiergesichts. Antworte NUR mit einem JSON-Objekt. Wenn das Bild gut ist, setze isSuitable auf true und feedback auf "Das ist ein super Foto!". Wenn es Probleme gibt, setze isSuitable auf false und gib einen kurzen, freundlichen Feedback-Satz für den Benutzer (z.B. "Das Foto ist etwas unscharf. Ein schärferes Bild würde bessere Kunst ergeben.").`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSuitable: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
          },
          required: ["isSuitable", "feedback"],
        },
      },
    });

    const jsonString = response.text.trim();
    const result: ImageAnalysisResult = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error analyzing image quality:", error);
    // Fallback in case of API error, assume the image is okay to not block the user.
    return {
      isSuitable: true,
      feedback: "Bild konnte nicht analysiert werden, fahre trotzdem fort.",
    };
  }
};


export const generatePetArt = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("API did not return an image.");

  } catch (error) {
    console.error("Error generating pet art:", error);
    // Return a placeholder or throw a more specific error
    throw new Error("Failed to generate artwork. Please try again.");
  }
};