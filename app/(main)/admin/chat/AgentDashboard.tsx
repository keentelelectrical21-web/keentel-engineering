'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NAVY = '#06103C';
const MAGENTA = '#A8228A';
const MAGENTA_DARK = '#C72E9E';

interface Session {
  id: string;
  visitor_id: string;
  mode: 'ai' | 'human' | 'ended';
  claimed_by?: string;
  status: 'active' | 'closed';
  current_page?: string;
  site_entry_at: string;
  last_activity_at: string;
  message_count: number;
  ai_summary?: string;
  intent_score: 'low' | 'medium' | 'high' | 'hot';
  topics?: string[];
  project_size?: string;
  project_location?: string;
  project_timeline?: string;
  human_requested_at?: string;
}

interface Message {
  id: string;
  session_id: string;
  role: 'visitor' | 'ai' | 'agent';
  content: string;
  agent_name?: string;
  created_at: string;
}

interface Lead {
  name?: string;
  email?: string;
  phone?: string;
  project_type?: string;
}

const INTENT_COLORS: Record<string, string> = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#f97316',
  hot: '#ef4444',
};

const INTENT_ICONS: Record<string, string> = {
  low: '⚪',
  medium: '🟡',
  high: '🟠',
  hot: '🔴',
};

function elapsed(from: string) {
  const secs = Math.floor((Date.now() - new Date(from).getTime()) / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ${secs % 60}s`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function AgentDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lead, setLead] = useState<Lead | null>(null);
  const [agentInput, setAgentInput] = useState('');
  const [agentName, setAgentName] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('keentel_agent_name') || '' : '');
  const [agentStatus, setAgentStatus] = useState<'online' | 'watching' | 'away'>('online');
  const [visitorTyping, setVisitorTyping] = useState<string>('');
  const [joinTimers, setJoinTimers] = useState<Record<string, number>>({});
  const [leadsToday, setLeadsToday] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [claudeKey, setClaudeKey] = useState('');
  const [savedKey, setSavedKey] = useState(false);
  const [ticker, setTicker] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLAudioElement | null>(null);

  // Tick every second for elapsed timers
  useEffect(() => {
    const t = setInterval(() => setTicker((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Load settings
  useEffect(() => {
    fetch('/api/chat/settings').then((r) => r.json()).then((d) => {
      if (d.claude_api_key) setClaudeKey(d.claude_api_key);
    });
  }, []);

  // Load sessions
  const loadSessions = useCallback(async () => {
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('status', 'active')
      .order('last_activity_at', { ascending: false });
    if (data) {
      setSessions(data as Session[]);
      setActiveCount(data.filter((s: Session) => s.mode !== 'ended').length);
    }
  }, []);

  useEffect(() => {
    loadSessions();
    // Leads today
    const today = new Date().toISOString().split('T')[0];
    supabase.from('chat_leads').select('id').gte('created_at', today).then(({ data }) => {
      setLeadsToday(data?.length || 0);
    });
  }, [loadSessions]);

  // Realtime: session updates
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_sessions' }, () => {
        loadSessions();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadSessions]);

  // Realtime: human requests — trigger sound alert
  useEffect(() => {
    const channel = supabase
      .channel('human-requests')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_sessions',
      }, (payload) => {
        const updated = payload.new as Session;
        if (updated.human_requested_at && agentStatus !== 'away') {
          alertRef.current?.play().catch(() => {});
          // Start 2-min countdown
          let secs = 120;
          setJoinTimers((prev) => ({ ...prev, [updated.id]: secs }));
          const t = setInterval(() => {
            secs--;
            setJoinTimers((prev) => ({ ...prev, [updated.id]: secs }));
            if (secs <= 0) clearInterval(t);
          }, 1000);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [agentStatus]);

  // Load messages for selected session
  useEffect(() => {
    if (!selected) return;
    supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', selected.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setMessages(data as Message[]); });

    supabase
      .from('chat_leads')
      .select('*')
      .eq('session_id', selected.id)
      .single()
      .then(({ data }) => setLead(data));

    // Realtime messages for selected session
    const channel = supabase
      .channel(`agent:${selected.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${selected.id}`,
      }, (payload) => {
        setMessages((prev) => {
          if (prev.find((m) => m.id === payload.new.id)) return prev;
          return [...prev, payload.new as Message];
        });
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .on('broadcast', { event: 'visitor_typing' }, (payload) => {
        setVisitorTyping(payload.payload?.text || '');
        setTimeout(() => setVisitorTyping(''), 3000);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selected]);

  async function joinSession(session: Session) {
    if (!agentName) return alert('Set your agent name first (click your name in the top bar)');
    await fetch('/api/chat/agent-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session.id, agentName }),
    });
    loadSessions();
    setSelected({ ...session, mode: 'human', claimed_by: agentName });
    setJoinTimers((prev) => { const n = { ...prev }; delete n[session.id]; return n; });
  }

  async function releaseToAI(session: Session) {
    await fetch('/api/chat/agent-release', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session.id }),
    });
    loadSessions();
    setSelected((prev) => prev ? { ...prev, mode: 'ai', claimed_by: undefined } : null);
  }

  async function sendAgentMessage() {
    if (!agentInput.trim() || !selected) return;
    const msg = agentInput.trim();
    setAgentInput('');
    await fetch('/api/chat/agent-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: selected.id, agentName, message: msg }),
    });
  }

  async function saveSettings() {
    await fetch('/api/chat/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claude_api_key: claudeKey }),
    });
    setSavedKey(true);
    setTimeout(() => setSavedKey(false), 2000);
  }

  function setAgent(name: string) {
    setAgentName(name);
    localStorage.setItem('keentel_agent_name', name);
  }

  const intentColor = (score: string) => INTENT_COLORS[score] || '#6b7280';

  return (
    <div className="h-screen flex flex-col overflow-hidden font-jost" style={{ background: '#0a1628', color: '#fff' }}>
      <audio ref={alertRef} src="/sounds/alert.mp3" />

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ background: NAVY, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-4">
          <img src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png" alt="Keentel" className="h-6 w-auto brightness-0 invert" />
          <span className="text-white font-urbanist font-bold text-sm">Chat Dashboard</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(168,34,138,0.2)', color: MAGENTA_DARK }}>
            Active: {activeCount}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
            Leads today: {leadsToday}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Agent name */}
          <input
            value={agentName}
            onChange={(e) => setAgent(e.target.value)}
            placeholder="Your name"
            className="px-3 py-1.5 rounded-full text-xs text-white outline-none w-28"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          />
          {/* Status */}
          {(['online', 'watching', 'away'] as const).map((s) => (
            <button key={s} onClick={() => setAgentStatus(s)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold capitalize transition-all"
              style={agentStatus === s
                ? { background: s === 'online' ? '#22c55e' : s === 'watching' ? '#f59e0b' : '#6b7280', color: '#fff' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
            >{s}</button>
          ))}
          <button onClick={() => setShowSettings(!showSettings)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
      </div>

      {/* SETTINGS PANEL */}
      {showSettings && (
        <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0" style={{ background: '#0d1f3c', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs text-white/50 whitespace-nowrap">Claude API Key:</span>
          <input
            type="password"
            value={claudeKey}
            onChange={(e) => setClaudeKey(e.target.value)}
            placeholder="sk-ant-..."
            className="flex-1 max-w-md px-3 py-1.5 rounded-full text-xs text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          />
          <button onClick={saveSettings} className="px-4 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: savedKey ? '#22c55e' : `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>
            {savedKey ? '✓ Saved' : 'Save Key'}
          </button>
          <span className="text-[10px] text-white/30">Using: Claude Haiku · claude-haiku-4-5-20251001</span>
        </div>
      )}

      {/* THREE-PANEL BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — CONVERSATIONS */}
        <div className="w-72 flex-shrink-0 overflow-y-auto" style={{ background: '#0d1f3c', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white/30">Conversations</p>
          {sessions.length === 0 && (
            <p className="px-4 text-xs text-white/20 text-center mt-8">No active conversations</p>
          )}
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              className="px-4 py-3 cursor-pointer transition-colors"
              style={{
                background: selected?.id === s.id ? 'rgba(168,34,138,0.15)' : 'transparent',
                borderLeft: selected?.id === s.id ? `3px solid ${MAGENTA}` : '3px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{INTENT_ICONS[s.intent_score]}</span>
                  <span className="text-xs font-semibold text-white truncate max-w-[100px]">
                    {s.claimed_by ? s.claimed_by : `Visitor`}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${intentColor(s.intent_score)}20`, color: intentColor(s.intent_score) }}>
                  {s.intent_score}
                </span>
              </div>
              <p className="text-[11px] truncate mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {s.current_page || '/'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {elapsed(s.site_entry_at)}
                </span>
                {s.human_requested_at && !s.claimed_by && joinTimers[s.id] !== undefined && (
                  <span className="text-[10px] font-bold" style={{ color: '#ef4444' }}>
                    ⚡ {joinTimers[s.id]}s
                  </span>
                )}
                {s.mode === 'human' && s.claimed_by && (
                  <span className="text-[10px]" style={{ color: '#22c55e' }}>● Human</span>
                )}
              </div>
              {s.ai_summary && (
                <p className="text-[10px] mt-1 line-clamp-2" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.ai_summary}</p>
              )}
              {/* Watch / Join buttons */}
              <div className="flex gap-1.5 mt-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(s); }}
                  className="flex-1 py-1 rounded-full text-[10px] font-semibold transition-colors hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                >Watch</button>
                {s.mode !== 'human' || s.claimed_by === agentName ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); joinSession(s); }}
                    className="flex-1 py-1 rounded-full text-[10px] font-semibold text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}
                  >Join</button>
                ) : (
                  <span className="flex-1 py-1 rounded-full text-[10px] text-center font-semibold truncate px-1" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                    {s.claimed_by}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE — TRANSCRIPT */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {!selected ? (
            <div className="flex-1 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <p className="text-sm">Select a conversation</p>
              </div>
            </div>
          ) : (
            <>
              {/* AI Summary card */}
              {selected.ai_summary && (
                <div className="px-5 py-3 flex-shrink-0" style={{ background: 'rgba(168,34,138,0.08)', borderBottom: '1px solid rgba(168,34,138,0.15)' }}>
                  <p className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: MAGENTA }}>AI Summary</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{selected.ai_summary}</p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role !== 'visitor' && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold"
                        style={{ background: msg.role === 'agent' ? '#22c55e' : `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>
                        {msg.role === 'agent' ? 'A' : 'AI'}
                      </div>
                    )}
                    <div className="max-w-[70%]">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {msg.role === 'visitor' ? 'Visitor' : msg.role === 'agent' ? (msg.agent_name || 'Agent') : 'AI'}
                        </span>
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{formatTime(msg.created_at)}</span>
                      </div>
                      <div className="rounded-xl px-3 py-2 text-sm leading-relaxed"
                        style={msg.role === 'visitor'
                          ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }
                          : msg.role === 'agent'
                          ? { background: 'rgba(34,197,94,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(34,197,94,0.2)' }
                          : { background: `rgba(168,34,138,0.12)`, color: 'rgba(255,255,255,0.85)', border: `1px solid rgba(168,34,138,0.2)` }}>
                        {msg.content}
                      </div>
                    </div>
                    {msg.role === 'visitor' && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold" style={{ background: 'rgba(255,255,255,0.1)' }}>V</div>
                    )}
                  </div>
                ))}
                {visitorTyping && (
                  <div className="flex justify-end gap-2">
                    <div className="px-3 py-2 rounded-xl text-xs italic max-w-[60%]" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                      {visitorTyping}…
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]" style={{ background: 'rgba(255,255,255,0.1)' }}>V</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Agent input */}
              {selected.mode === 'human' && selected.claimed_by === agentName && (
                <div className="px-5 py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-2">
                    <input
                      value={agentInput}
                      onChange={(e) => setAgentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendAgentMessage()}
                      placeholder="Type a message to visitor…"
                      className="flex-1 px-4 py-2.5 rounded-full text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                    />
                    <button onClick={sendAgentMessage} className="px-4 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>Send</button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => releaseToAI(selected)} className="text-[11px] px-3 py-1 rounded-full transition-colors hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}>Hand Back to AI</button>
                  </div>
                </div>
              )}

              {/* Join prompt if not claimed */}
              {selected.mode === 'ai' && (
                <div className="px-5 py-3 flex-shrink-0 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Watching — AI is responding</span>
                  <button onClick={() => joinSession(selected)} className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>Join Now</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT — VISITOR CONTEXT */}
        <div className="w-72 flex-shrink-0 overflow-y-auto px-4 py-4 space-y-4" style={{ background: '#0d1f3c' }}>
          {!selected ? (
            <p className="text-xs text-white/20 text-center mt-8">Select a conversation</p>
          ) : (
            <>
              {/* Live activity */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: MAGENTA }}>Live Activity</p>
                <div className="space-y-2">
                  {[
                    ['Page', selected.current_page || '/'],
                    ['On site', elapsed(selected.site_entry_at)],
                    ['Session', elapsed(selected.last_activity_at)],
                    ['Messages', String(selected.message_count)],
                    ['Mode', selected.mode === 'human' ? `Human (${selected.claimed_by})` : 'AI'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                      <span className="text-white font-medium truncate max-w-[60%] text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intent score */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: MAGENTA }}>Intent Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{INTENT_ICONS[selected.intent_score]}</span>
                  <span className="font-urbanist font-black text-lg uppercase" style={{ color: intentColor(selected.intent_score) }}>
                    {selected.intent_score}
                  </span>
                </div>
              </div>

              {/* Lead data */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: MAGENTA }}>Lead Data</p>
                <div className="rounded-xl p-3 space-y-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    ['Name', lead?.name],
                    ['Email', lead?.email],
                    ['Phone', lead?.phone],
                    ['Project', lead?.project_type],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex justify-between text-xs gap-2">
                      <span style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                      <span className={`${value ? 'text-white' : 'text-white/20'} truncate max-w-[60%] text-right`}>{value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics detected */}
              {selected.topics && selected.topics.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: MAGENTA }}>Topics Detected</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.topics.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: `${MAGENTA}20`, color: MAGENTA_DARK }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project details */}
              {(selected.project_size || selected.project_location || selected.project_timeline) && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: MAGENTA }}>Project Details</p>
                  <div className="space-y-1.5">
                    {selected.project_size && <div className="text-xs flex justify-between"><span style={{ color: 'rgba(255,255,255,0.35)' }}>Size</span><span className="text-white">{selected.project_size}</span></div>}
                    {selected.project_location && <div className="text-xs flex justify-between"><span style={{ color: 'rgba(255,255,255,0.35)' }}>Location</span><span className="text-white">{selected.project_location}</span></div>}
                    {selected.project_timeline && <div className="text-xs flex justify-between"><span style={{ color: 'rgba(255,255,255,0.35)' }}>Timeline</span><span className="text-white">{selected.project_timeline}</span></div>}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
