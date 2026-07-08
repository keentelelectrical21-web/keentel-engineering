// app/api/chat/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { sessionId, claudeKey } = await req.json();
    const apiKey = claudeKey || process.env.ANTHROPIC_API_KEY;

    const { data: messages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (!messages || messages.length < 2) return NextResponse.json({ ok: true });

    const transcript = messages.map((m) =>
      `${m.role === 'visitor' ? 'VISITOR' : 'AI'}: ${m.content}`
    ).join('\n');

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `Summarize this power engineering chat conversation in 2-3 sentences for an agent. Focus on: what service the visitor needs, project details mentioned (MW, location, timeline), and whether contact info was captured. Be specific.\n\n${transcript}`,
        }],
      }),
    });

    const data = await res.json();
    const summary = data.content?.[0]?.text || '';

    await supabase.from('chat_sessions')
      .update({ ai_summary: summary })
      .eq('id', sessionId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Summary failed' }, { status: 500 });
  }
}
