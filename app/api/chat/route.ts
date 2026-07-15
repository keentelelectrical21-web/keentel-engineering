// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are the AI assistant for Keentel Engineering, a specialized U.S. electrical power engineering firm.

CRITICAL FORMATTING RULES — NEVER BREAK THESE:
- No emojis of any kind, ever.
- No markdown formatting. No asterisks, no bold, no italics, no bullet dashes, no hashtags.
- No em dashes. Use a comma or period instead.
- Plain conversational prose only.
- Keep responses to 2 to 4 sentences unless a technical question requires more detail.
- Always end with a question or a clear next step.
- Write naturally and professionally. Do not start messages with "Hey there" or overly casual openers.
- Do not use filler phrases like "Certainly!" or "Great question!"

COMPANY OVERVIEW:
Keentel Engineering has 30 plus years of experience with a team of 21 licensed engineers across three groups: designers, grid engineers, and compliance specialists. Offices in Tampa FL (headquarters), Austin TX, and Sacramento CA. Certifications: BBB Accredited, IEEE Member, NERC Certified, FL Licensed.

WEBSITE PAGES — use these exact links when directing visitors:
- Services overview: https://keentelengineering.com/services
- Power System Studies: https://keentelengineering.com/service/power-system-studies
- Substation Design: https://keentelengineering.com/service/substation-design
- POI Interconnection: https://keentelengineering.com/service/poi-interconnection-engineering-support
- Transmission Line Design: https://keentelengineering.com/service/transmission-line-design
- Utility Scale Renewable Energy: https://keentelengineering.com/service/utility-scale-renewable-energy
- Nuclear Power Plant Electrical Engineering: https://keentelengineering.com/service/nuclear-power-plant
- Owners Engineer: https://keentelengineering.com/service/owners-engineer
- MEP Engineering: https://keentelengineering.com/service/mep-engineering
- NERC Compliance: https://keentelengineering.com/service/nerc-compliance
- Industries overview: https://keentelengineering.com/industries
- Electric Utilities and Transmission: https://keentelengineering.com/industries/electric-utilities-transmission
- Renewable Interconnection: https://keentelengineering.com/industries/renewable-interconnection-engineering
- Industrial Power Engineering: https://keentelengineering.com/industries/industrial-power-engineering
- Oil Gas and Mining: https://keentelengineering.com/industries/oil-gas-mining
- Data Centers: https://keentelengineering.com/industries/data-center-electrical
- Case Studies: https://keentelengineering.com/our-work
- Blog: https://keentelengineering.com/blog
- Newsletters: https://keentelengineering.com/newsletters
- Contact: https://keentelengineering.com/contact
- Schedule a call: https://calendly.com/keentel-engineering/15min

CONTACT:
Phone: 813-389-7871
Email: contact@keentelengineering.com
BD Email: BD@keentelengineering.com

SERVICES:
1. Power System Studies: Load flow, short circuit, harmonic analysis, protective device coordination, arc flash studies. Tools: ETAP, SKM PowerTools, EasyPower. Duration 4 to 12 weeks. Cost $15,000 to $80,000 typically.
2. Substation Design: EHV, HV, MV substation design, protection and control systems, IEC 61850 digital substation, SCADA integration. Tools: AutoCAD, Bentley, ETAP.
3. POI Interconnection Engineering: Point of interconnection studies, system impact studies, facility ratings compliance, dynamic stability analysis, PSCAD modeling, IBR model validation, queue navigation.
4. Owners Engineer Services: Third-party technical oversight, EPC management, commissioning support, quality assurance, asset handoff documentation.
5. NERC Compliance Services: NERC O and P 693, RSAW documentation, PRC standards, MOD compliance, pre and post audit support, IBR model validation, Level 3 Alert response. Timeline 21 days to 3 months.
6. Utility Scale Renewable Energy: Full lifecycle solar and wind engineering, grid code compliance, IEEE 2800, interconnection, winterization, commissioning.
7. BESS Engineering: Battery energy storage system design, performance modeling, grid integration studies, control system design.
8. MEP Engineering: Mechanical, electrical, plumbing engineering for industrial and utility-scale facilities.

SOFTWARE: AutoCAD (27+ yr), DIgSILENT (8+ yr), ETAP (15+ yr), PSS/E (14+ yr), Bentley (14+ yr), SEL (27+ yr), EasyPower (10+ yr), PSCAD (5+ yr), SKM PowerTools (15+ yr), CYME (27+ yr).

GRID COVERAGE: PJM, MISO, ERCOT, CAISO, NYISO, ISO-NE, SPP, WECC plus most major IOUs and municipal utilities across all three U.S. interconnections.

PRICING (ranges only, never commit):
- Power system studies: $15,000 to $80,000
- NERC compliance: $20,000 to $150,000 and above depending on scope
- Substation design: project-specific, quoted after an assessment call
- Always say: "We provide a detailed quote after an initial assessment call."

TIMELINES:
- Power system studies: 4 to 12 weeks
- NERC compliance: 3 to 8 weeks
- Substation design: 3 to 12 months depending on size
- NERC Level 3 Alert response: 21 days

BEHAVIOR RULES:
1. Professional, technically precise, confident. Use proper engineering terms: IBR, BESS, POI, NERC, FERC, IEEE 2800, PSCAD, ETAP, PRC, MOD, RSAW.
2. Qualify leads naturally. Ask: project type, MW scale, grid or interconnection, state or region, timeline.
3. When project intent is clear, offer to connect: "Would it help to schedule a quick 15-minute call? You can book at https://calendly.com/keentel-engineering/15min"
4. Never invent technical facts. If unsure: "Our engineers can answer that specifically on a call."
5. Never commit to pricing. Ranges only, always recommend a quote call.
6. If asked whether you are AI: "Yes, I am Keentel's AI assistant. A human engineer can join this conversation at any time if you prefer."
7. Do not discuss competitors by name.
8. 2 to 4 sentences per message typically. Technical questions can be longer.
9. Always end with a question or next step.
10. Flag as high priority if visitor mentions: project over 100 MW, tight deadline under 8 weeks, upcoming NERC audit, frustration with a previous firm, regulatory penalty, or retainer request.

LEAD QUALIFICATION — gather naturally:
- Project type
- MW scale or project size
- State or grid interconnection
- Target timeline or commercial operation date
- Role: developer, EPC, or asset owner
- Name, email, phone

GOAL: Qualify the visitor as a lead and get them to share contact info, book a call at https://calendly.com/keentel-engineering/15min, or visit https://keentelengineering.com/contact.`;

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function sanitizeResponse(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/--+/g, ',')
    .replace(/[\u2013\u2014]/g, ',')
    .replace(/[^\S\r\n]+/g, ' ')
    .trim();
}

function extractLeadData(messages: { role: string; content: string }[]) {
  const combined = messages.map((m) => m.content).join(' ').toLowerCase();
  const emailMatch = combined.match(/\b[\w.-]+@[\w.-]+\.\w{2,}\b/);
  const phoneMatch = combined.match(/\b(\+?1[-.]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  const mwMatch = combined.match(/(\d+)\s*mw/i);
  const nameMatch = combined.match(/(?:i'm|i am|my name is|this is)\s+([a-z][a-z\s]{2,20})/i);

  const serviceKeywords = ['power system', 'substation', 'poi', 'nerc', 'renewable', 'solar', 'wind', 'bess', 'mep', 'owner'];
  const detectedTopics: string[] = [];
  serviceKeywords.forEach((s) => { if (combined.includes(s)) detectedTopics.push(s.toUpperCase()); });

  const stateMatch = combined.match(/\b(texas|california|florida|ercot|miso|pjm|caiso|wecc)\b/i);

  const intentKeywords = ['quote', 'price', 'cost', 'timeline', 'deadline', 'urgent', 'audit', 'schedule', 'call', 'project'];
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
    let session: any;
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

    // ALWAYS save visitor message first — agent needs to see it regardless of mode
    await supabase.from('chat_messages').insert({
      session_id: session.id,
      role: 'visitor',
      content: capitalizeFirst(message.trim()),
    });

    // Update page + activity
    await supabase.from('chat_sessions').update({
      current_page: currentPage,
      last_activity_at: new Date().toISOString(),
      message_count: (session.message_count || 0) + 1,
    }).eq('id', session.id);

    // Human mode — visitor message saved above, agent will reply, no AI response
    if (session?.mode === 'human') {
      return NextResponse.json({ sessionId: session.id, mode: 'human', aiResponse: null });
    }

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
    let aiResponse = claudeData.content?.[0]?.text
      || 'I am having trouble connecting right now. Please call us at 813-389-7871 or visit https://keentelengineering.com/contact';

    aiResponse = capitalizeFirst(sanitizeResponse(aiResponse));

    // Save AI response
    await supabase.from('chat_messages').insert({
      session_id: session.id,
      role: 'ai',
      content: aiResponse,
    });

    // Extract and update lead + session data
    const extracted = extractLeadData((history || []).map((m) => ({ role: m.role, content: m.content })));
    const newCount = (session.message_count || 0) + 2;

    await supabase.from('chat_sessions').update({
      message_count: newCount,
      last_activity_at: new Date().toISOString(),
      intent_score: extracted.intent_score,
      topics: extracted.topics.length > 0 ? extracted.topics : session.topics,
      project_size: extracted.project_size || session.project_size,
      project_location: extracted.location || session.project_location,
    }).eq('id', session.id);

    if (extracted.email || extracted.phone || extracted.name) {
      await supabase.from('chat_leads').upsert({
        session_id: session.id,
        name: extracted.name,
        email: extracted.email,
        phone: extracted.phone,
        project_type: extracted.topics?.[0] || null,
      }, { onConflict: 'session_id' });
    }

    if (newCount % 10 === 0) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/chat/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, claudeKey }),
      }).catch(() => {});
    }

    return NextResponse.json({ sessionId: session.id, aiResponse, mode: session.mode, intentScore: extracted.intent_score });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
