import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Test DB write
  const testConvId = 'debug-test-' + Date.now();
  const { error: insertErr } = await supabase.from('conversations').insert({
    id: testConvId,
    user_id: user.id,
    title: '[DEBUG] Test Conversation'
  });

  // Read back all conversations
  const { data: conversations, error: readErr } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  // Read favorites
  const { data: favorites, error: favErr } = await supabase
    .from('favorite_sessions')
    .select('*')
    .eq('user_id', user.id);

  // Cleanup test row
  await supabase.from('conversations').delete().eq('id', testConvId);

  return NextResponse.json({
    userId: user.id,
    email: user.email,
    insertTestError: insertErr?.message || null,
    readError: readErr?.message || null,
    favError: favErr?.message || null,
    conversationCount: conversations?.length ?? 0,
    conversations: conversations?.slice(0, 5) ?? [],
    favoriteCount: favorites?.length ?? 0,
    favorites: favorites ?? [],
  });
}
