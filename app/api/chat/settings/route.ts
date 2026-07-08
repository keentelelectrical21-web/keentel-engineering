// app/api/chat/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data } = await supabase
    .from('chat_settings')
    .select('claude_api_key, proactive_message, proactive_delay_seconds')
    .eq('id', 1)
    .single();
  return NextResponse.json(data || {});
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await supabase.from('chat_settings').update({
    ...body,
    updated_at: new Date().toISOString(),
  }).eq('id', 1);
  return NextResponse.json({ ok: true });
}
