// app/api/chat/human-request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  await supabase.from('chat_sessions').update({
    human_requested_at: new Date().toISOString(),
    last_activity_at: new Date().toISOString(),
  }).eq('id', sessionId);
  return NextResponse.json({ ok: true });
}
