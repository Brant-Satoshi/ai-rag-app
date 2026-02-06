import { success, error } from '@/lib/api/response';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return Response.json(error('Message is required'), { status: 400 });
    }

    // TODO: Replace with actual LLM/RAG logic
    const reply = `Received: "${message}" - RAG/LLM not yet implemented`;

    return Response.json(success({ reply }));
  } catch (e) {
    return Response.json(error('Invalid request body'), { status: 400 });
  }
}
