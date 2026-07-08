// app/api/chat/agent-join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { sessionId, agentName, message } = await req.json();

  await supabase.from('chat_sessions').update({
    mode: 'human',
    claimed_by: agentName,
    claimed_at: new Date().toISOString(),
  }).eq('id', sessionId);

  if (message) {
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'agent',
      agent_name: agentName,
      content: message,
    });
  }

  return NextResponse.json({ ok: true });
}
