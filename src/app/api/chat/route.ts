import { createClient } from '@/utils/supabase/server';

export const maxDuration = 60;

export async function POST(req: Request) {
  console.log('--- Chat API Route Started ---');
  try {
    const { messages, conversationId } = await req.json();
    console.log(`--- [API/CHAT] Incoming Request ---`);
    console.log(`Conversation ID: ${conversationId}`);
    console.log(`Messages Count: ${messages?.length || 0}`);
    if (messages && messages.length > 0) {
      console.log(`Last Message Role: ${messages[messages.length - 1].role}`);
      console.log(`Last Message Prefix: ${messages[messages.length - 1].content?.substring(0, 50)}...`);
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Unauthorized: No user found');
      return new Response('Unauthorized', { status: 401 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    console.log(`Calling Backend: ${backendUrl}/chat`);

    const enhancedMessages = [...messages];
    if (enhancedMessages.length > 0 && enhancedMessages[enhancedMessages.length - 1].role === 'user') {
        const strictPrompt = `
        
### SYSTEM INSTRUCTION ###
You are the AI MED-VOICE diagnostic engine. You MUST respond with a single, valid JSON object. 
No conversational filler. No markdown formatting. No backticks.

REQUIRED JSON STRUCTURE:
{
  "analysis": "Clinical breakdown: 1. Synthesis of symptoms 2. Triage conditions 3. Recommended actions 4. Urgency (Low/Medium/High).",
  "chat_response": "A direct 1-sentence response to the patient."
}

CRITICAL: If input is unclear or gibberish, ask for clarification in "chat_response" and set "analysis" to "Insufficient data for clinical analysis."
### END INSTRUCTION ###`;
        
        enhancedMessages[enhancedMessages.length - 1].content = 
            enhancedMessages[enhancedMessages.length - 1].content + strictPrompt;
    }

    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: enhancedMessages,
        conversation_id: conversationId,
        user_id: user.id
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend Error (${response.status}):`, errorText);
      
      // Fallback response when backend is unavailable
      if (response.status === 503 || response.status === 404) {
        console.warn('Backend service unavailable, using fallback response');
        const fallbackAssistantContent = JSON.stringify({
          analysis: "Backend service is temporarily unavailable. Please try again in a moment.",
          chat_response: "I apologize, but I'm currently unable to process your request. Our system is undergoing maintenance. Please try again shortly."
        });
        
        let currentConvId = conversationId || crypto.randomUUID();
        
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(fallbackAssistantContent));
            controller.close();
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'x-conversation-id': currentConvId
          }
        });
      }
      
      throw new Error(`Backend error: ${errorText}`);
    }

    const data = await response.json();
    console.log('Backend response received successfully');
    
    // 1. Resolve Conversation ID
    let currentConvId = conversationId || data.conversation_id;
    if (!currentConvId) {
        const newId = crypto.randomUUID();
        try {
          // Create conversation
          const title = messages[messages.length - 1].content.substring(0, 50) + '...';
          await supabase.from('conversations').insert({
              id: newId,
              user_id: user.id,
              title: title
          });
        } catch (convError: any) {
          console.error('Error creating conversation:', convError);
          // Still use the ID even if creation fails
        }
        currentConvId = newId;
    }

    const assistantContent = data.messages[data.messages.length - 1].content;

    // 2. Persist Messages to Supabase
    // Save User Message
    const lastUserMsg = messages[messages.length - 1];
    try {
      await supabase.from('messages').insert({
        conversation_id: currentConvId,
        role: 'user',
        content: lastUserMsg.content,
        user_id: user.id
      });

      // Save Assistant Message
      await supabase.from('messages').insert({
        conversation_id: currentConvId,
        role: 'assistant',
        content: assistantContent,
        user_id: user.id
      });
    } catch (dbError: any) {
      console.error('Error persisting messages to database:', dbError);
      // Don't fail the entire request if database operations fail
      // The user will still get a response
    }

    // 3. Return response with stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(assistantContent));
            controller.close();
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'x-conversation-id': currentConvId
        }
    });

  } catch (error: any) {
    console.error('Chat API Route Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
