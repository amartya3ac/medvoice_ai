import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await generateText({
      model: google('gemini-1.5-flash'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'You are a medical document OCR assistant. Extract all medication names, dosages (e.g., 500mg), frequency (e.g., twice a day), and any specific medical conditions mentioned in this document. Provide the output as a clean, concise bulleted list. If it is not a medical document, state "No relevant medical data found".' },
            { type: 'file', data: buffer, mimeType: file.type } as any,
          ],
        },
      ],
    });

    return new Response(JSON.stringify({ text: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('OCR Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
