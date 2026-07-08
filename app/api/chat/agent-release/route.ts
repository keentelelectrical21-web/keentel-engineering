// app/api/chat/agent-release/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  await supabase.from('chat_sessions').update({
    mode: 'ai',
    claimed_by: null,
    claimed_at: null,
    human_requested_at: null,
  }).eq('id', sessionId);
  return NextResponse.json({ ok: true });
}
