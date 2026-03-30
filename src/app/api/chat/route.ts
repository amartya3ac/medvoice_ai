import { createClient } from '@/utils/supabase/server';

export const maxDuration = 60;

// Helper: Always save conversation + messages to Supabase
async function persistToDb(
  supabase: any,
  userId: string,
  conversationId: string,
  userContent: string,
  assistantContent: string
) {
  try {
    const title = userContent.substring(0, 50) + '...';
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .single();

    if (!existing) {
      await supabase.from('conversations').insert({
        id: conversationId,
        user_id: userId,
        title: title,
      });
    } else {
      await supabase.from('conversations').update({
        updated_at: new Date().toISOString(),
      }).eq('id', conversationId);
    }

    await supabase.from('messages').insert([
      { conversation_id: conversationId, role: 'user', content: userContent, user_id: userId },
      { conversation_id: conversationId, role: 'assistant', content: assistantContent, user_id: userId },
    ]);

    console.log(`[DB] Saved conversation ${conversationId} successfully.`);
  } catch (err: any) {
    console.error('[DB] Failed to persist conversation:', err?.message);
  }
}

export async function POST(req: Request) {
  console.log('--- Chat API Route Started ---');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('Unauthorized: No user found');
    return new Response('Unauthorized', { status: 401 });
  }

  let messages: any[] = [];
  let conversationId: string | null = null;

  try {
    const body = await req.json();
    messages = body.messages || [];
    conversationId = body.conversationId || null;
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }

  const currentConvId = conversationId || crypto.randomUUID();
  const userContent = messages[messages.length - 1]?.content || '';

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  const enhancedMessages = [...messages];
  if (enhancedMessages.length > 0 && enhancedMessages[enhancedMessages.length - 1].role === 'user') {
    const strictPrompt = `

### SYSTEM INSTRUCTION ###
You are the AI MED-VOICE diagnostic engine. You MUST respond with a single, valid JSON object. 
No conversational filler. No markdown formatting. No backticks.

REQUIRED JSON STRUCTURE:
{
  "specialty": "Medical specialty name",
  "diagnosis": "Detailed clinical breakdown",
  "home_remedies": [{"title": "...", "description": "...", "clinical_logic": "..."}],
  "medical_treatments": [{"title": "...", "description": "...", "clinical_logic": "..."}]
}

CRITICAL: If input is unclear or gibberish, ask for clarification and set diagnosis to "Insufficient data for clinical analysis."
### END INSTRUCTION ###`;

    enhancedMessages[enhancedMessages.length - 1].content =
      enhancedMessages[enhancedMessages.length - 1].content + strictPrompt;
  }

  // --- Try the Python backend ---
  let assistantContent: string | null = null;

  try {
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: enhancedMessages,
        conversation_id: currentConvId,
        user_id: user.id,
      }),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (response.ok) {
      const respJson = await response.json();
      assistantContent = respJson?.data?.messages?.[respJson.data.messages.length - 1]?.content || null;
      console.log('Backend responded successfully');
    } else {
      const errText = await response.text();
      console.warn(`Backend returned ${response.status}: ${errText}`);
    }
  } catch (fetchErr: any) {
    // ECONNREFUSED or timeout - backend is not running
    console.warn('[Backend] Unreachable:', fetchErr?.message || fetchErr);
  }

  // --- Fallback if backend failed or returned nothing ---
  if (!assistantContent) {
    assistantContent = JSON.stringify({
      specialty: 'General Physician',
      diagnosis: 'Our AI diagnostic engine is temporarily offline. Your consultation has been saved. Please try again in a moment, or consult a physician for urgent care.',
      home_remedies: [],
      medical_treatments: [],
      chat_response: "I'm currently in limited mode. Your message is saved — please try again shortly.",
    });
    console.warn('[Fallback] Using fallback response');
  }

  // --- ALWAYS persist to Supabase (both paths) ---
  await persistToDb(supabase, user.id, currentConvId, userContent, assistantContent);

  // --- Return stream ---
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(assistantContent!));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-conversation-id': currentConvId,
    },
  });
}
