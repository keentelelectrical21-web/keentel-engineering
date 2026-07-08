// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are the AI assistant for Keentel Engineering, a specialized U.S. electrical power engineering firm. You represent the company in a professional, knowledgeable, and helpful manner.

COMPANY OVERVIEW:
Keentel Engineering has 30+ years of experience and a team of 21 licensed engineers across three specialized groups: designers, grid whisperers, and compliance watchdogs. Offices in Tampa FL (HQ), Austin TX, and Sacramento CA. Licensed and certified: BBB Accredited, IEEE Member, NERC Certified, FL Licensed.

CONTACT INFORMATION:
Phone: 813-389-7871
Email: contact@keentelengineering.com
BD Email: BD@keentelengineering.com
Schedule a call: https://calendly.com/keentel-engineering/15min

SERVICES:
1. Power System Studies — Load flow, short circuit, harmonic analysis, protective device coordination, arc flash. Tools: ETAP, SKM PowerTools, EasyPower. Duration: 4-12 weeks. Cost: $15K-$80K typically.
2. Substation Design — EHV, HV, MV substation design, protection and control systems, IEC 61850 digital substation, SCADA integration. Tools: AutoCAD, Bentley, ETAP.
3. POI Interconnection Engineering — Point of interconnection studies, system impact studies, facility ratings compliance, dynamic stability analysis, PSCAD modeling, IBR model validation, queue navigation.
4. Owner's Engineer Services — Third-party technical oversight, EPC management, commissioning support, quality assurance.
5. NERC Compliance Services — NERC O&P 693, RSAW documentation, PRC standards, MOD compliance, pre/post-audit support, IBR model validation, Level 3 Alert response. Timeline: 21 days to 3 months.
6. Utility Scale Solar/Wind Engineering — Full lifecycle solar/wind engineering, grid code compliance, IEEE 2800, interconnection, winterization, commissioning.
7. BESS Engineering — Battery energy storage system design, performance modeling, grid integration studies.
8. MEP Engineering — Mechanical, electrical, plumbing for industrial and utility-scale facilities.

SOFTWARE: AutoCAD (27+yr), DIgSILENT (8+yr), ETAP (15+yr), PSS/E (14+yr), Bentley (14+yr), SEL (27+yr), EasyPower (10+yr), PSCAD (5+yr), SKM PowerTools (15+yr), CYME (27+yr).

GRID COVERAGE: PJM, MISO, ERCOT, CAISO, NYISO, ISO-NE, SPP, WECC plus major IOUs.

PRICING (ranges only, never commit):
- Power system studies: $15,000–$80,000
- NERC compliance: $20,000–$150,000+
- Substation design: project-specific, quoted after assessment
- Always say: "We provide a detailed quote after an initial assessment call."

TIMELINE GUIDANCE:
- Power system studies: 4–12 weeks
- NERC compliance: 3–8 weeks
- Substation design: 3–12 months
- NERC Level 3 Alert: 21 days

BEHAVIOR RULES:
1. Professional, technically precise, confident. Use proper engineering terminology: IBR, BESS, POI, NERC, FERC, IEEE 2800, PSCAD, ETAP, PRC, MOD, RSAW.
2. Qualify leads naturally: project type, MW scale, grid/interconnection, state/region, timeline.
3. When project intent is clear, offer scheduling: "Would it help to schedule a quick 15-minute call? https://calendly.com/keentel-engineering/15min"
4. Never invent technical facts. If unsure: "Our engineers can answer that specifically on a call."
5. Never commit to pricing — ranges only.
6. If asked if you're AI: "Yes, I'm Keentel's AI assistant. A human engineer can join this conversation at any time if you prefer."
7. Keep responses concise: 2-4 sentences typically. Technical questions can be longer.
8. Always end with a question or next step.

LEAD FLOW — naturally gather:
- Project type
- MW scale or project size
- State/grid interconnection
- Target timeline or COD
- Role: developer, EPC, or asset owner
- Name, email, phone

ESCALATION (internally important — flag these):
- Project >100MW mentioned
- Tight deadline <8 weeks
- NERC audit upcoming
- Previous engineering firm that let them down
- Regulatory penalty or FERC/NERC fine
- Retainer or ongoing services request
- Visitor seems frustrated

GOAL: Qualify visitor as lead → get contact info, book Calendly call, or submit contact form.`;

function extractLeadData(messages: { role: string; content: string }[]) {
  const combined = messages.map((m) => m.content).join(' ').toLowerCase();
  const emailMatch = combined.match(/\b[\w.-]+@[\w.-]+\.\w{2,}\b/);
  const phoneMatch = combined.match(/\b(\+?1[-.]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  const mwMatch = combined.match(/(\d+)\s*mw/i);
  const nameMatch = combined.match(/(?:i'm|i am|my name is|this is)\s+([a-z][a-z\s]{2,20})/i);

  const services = ['power system', 'substation', 'poi', 'nerc', 'renewable', 'solar', 'wind', 'bess', 'mep', 'owner'];
  const detectedTopics: string[] = [];
  services.forEach((s) => { if (combined.includes(s)) detectedTopics.push(s.toUpperCase()); });

  const stateMatch = combined.match(/\b(texas|california|florida|ercot|miso|pjm|caiso|wecc)\b/i);

  const intentKeywords = ['quote', 'price', 'cost', 'timeline', 'deadline', 'urgent', 'audit', 'schedule', 'call'];
  let intentScore = 'low';
  const messageCount = messages.filter((m) => m.role === 'user').length;
  const hasProject = mwMatch || combined.includes('project') || combined.includes('interconnection');
  const hasUrgency = intentKeywords.some((k) => combined.includes(k));
  const hasContact = emailMatch || phoneMatch;

  if (messageCount >= 6 && hasProject && hasContact) intentScore = 'hot';
  else if (messageCount >= 4 && hasProject && hasUrgency) intentScore = 'high';
  else if (messageCount >= 2 && (hasProject || hasUrgency)) intentScore = 'medium';

  return {
    email: emailMatch?.[0] || null,
    phone: phoneMatch?.[0] || null,
    project_size: mwMatch ? `${mwMatch[1]} MW` : null,
    name: nameMatch?.[1]?.trim() || null,
    topics: detectedTopics,
    location: stateMatch?.[0] || null,
    intent_score: intentScore,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, visitorId, message, currentPage } = await req.json();

    // Get Claude API key from settings
    const { data: settings } = await supabase
      .from('chat_settings')
      .select('claude_api_key')
      .eq('id', 1)
      .single();

    const claudeKey = settings?.claude_api_key || process.env.ANTHROPIC_API_KEY;
    if (!claudeKey) {
      return NextResponse.json({ error: 'Claude API key not configured' }, { status: 500 });
    }

    // Upsert session
    let session;
    if (sessionId) {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();
      session = data;
    }

    if (!session) {
      const { data } = await supabase
        .from('chat_sessions')
        .insert({ visitor_id: visitorId, current_page: currentPage })
        .select()
        .single();
      session = data;
    }

    // If session is in human mode, don't respond as AI
    if (session?.mode === 'human') {
      return NextResponse.json({ sessionId: session.id, mode: 'human', aiResponse: null });
    }

    // Save visitor message
    await supabase.from('chat_messages').insert({
      session_id: session.id,
      role: 'visitor',
      content: message,
    });

    // Get full history
    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', session.id)
      .order('created_at', { ascending: true });

    const anthropicMessages = (history || []).map((m) => ({
      role: m.role === 'visitor' ? 'user' : 'assistant',
      content: m.content,
    }));

    // Call Claude Haiku
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: anthropicMessages,
      }),
    });

    const claudeData = await claudeRes.json();
    const aiResponse = claudeData.content?.[0]?.text || "I'm having trouble connecting. Please try again or call us at 813-389-7871.";

    // Save AI response
    await supabase.from('chat_messages').insert({
      session_id: session.id,
      role: 'ai',
      content: aiResponse,
    });

    // Extract lead data + update session
    const allMessages = [...(history || []), { role: 'visitor', content: message }, { role: 'ai', content: aiResponse }];
    const extracted = extractLeadData(allMessages.map((m) => ({ role: m.role, content: m.content })));

    const newCount = (session.message_count || 0) + 2;

    await supabase.from('chat_sessions').update({
      message_count: newCount,
      last_activity_at: new Date().toISOString(),
      current_page: currentPage,
      intent_score: extracted.intent_score,
      topics: extracted.topics.length > 0 ? extracted.topics : session.topics,
      project_size: extracted.project_size || session.project_size,
      project_location: extracted.location || session.project_location,
    }).eq('id', session.id);

    // Upsert lead data if captured
    if (extracted.email || extracted.phone || extracted.name) {
      await supabase.from('chat_leads').upsert({
        session_id: session.id,
        name: extracted.name,
        email: extracted.email,
        phone: extracted.phone,
        project_type: extracted.topics?.[0] || null,
      }, { onConflict: 'session_id' });
    }

    // Trigger summary every 5 messages
    if (newCount % 10 === 0) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/chat/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, claudeKey }),
      }).catch(() => {});
    }

    return NextResponse.json({
      sessionId: session.id,
      aiResponse,
      mode: session.mode,
      intentScore: extracted.intent_score,
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
