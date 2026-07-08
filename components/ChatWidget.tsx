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

interface Message {
  id: string;
  role: 'visitor' | 'ai' | 'agent';
  content: string;
  agent_name?: string;
  created_at: string;
}

function getVisitorId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('keentel_visitor_id');
  if (!id) {
    id = `v_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    localStorage.setItem('keentel_visitor_id', id);
  }
  return id;
}

function getSessionId() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('keentel_session_id');
}

function setSessionId(id: string) {
  sessionStorage.setItem('keentel_session_id', id);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionIdState] = useState<string | null>(null);
  const [mode, setMode] = useState<'ai' | 'human'>('ai');
  const [humanRequested, setHumanRequested] = useState(false);
  const [humanTimer, setHumanTimer] = useState<number | null>(null);
  const [showBadge, setShowBadge] = useState(false);
  const [proactiveShown, setProactiveShown] = useState(false);
  const [visitorTyping, setVisitorTyping] = useState('');
  const [agentTyping, setAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const humanTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const proactiveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const channelRef = useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // Proactive message after 30s
  useEffect(() => {
    proactiveTimerRef.current = setTimeout(() => {
      if (!open && !proactiveShown) {
        setShowBadge(true);
        setProactiveShown(true);
      }
    }, 30000);
    return () => clearTimeout(proactiveTimerRef.current);
  }, [open, proactiveShown]);

  // Load existing session
  useEffect(() => {
    const sid = getSessionId();
    if (sid) {
      setSessionIdState(sid);
      supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sid)
        .order('created_at', { ascending: true })
        .then(({ data }) => { if (data) setMessages(data as Message[]); });
      supabase
        .from('chat_sessions')
        .select('mode')
        .eq('id', sid)
        .single()
        .then(({ data }) => { if (data) setMode(data.mode); });
    }
  }, []);

  // Subscribe to realtime when session exists
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`,
      }, (payload) => {
        const msg = payload.new as Message;
        if (msg.role === 'agent' || msg.role === 'ai') {
          setMessages((prev) => {
            if (prev.find((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          setAgentTyping(false);
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_sessions',
        filter: `id=eq.${sessionId}`,
      }, (payload) => {
        if (payload.new.mode) setMode(payload.new.mode);
      })
      .on('broadcast', { event: 'agent_typing' }, () => {
        setAgentTyping(true);
        setTimeout(() => setAgentTyping(false), 3000);
      })
      .subscribe();

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  async function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setLoading(true);

    const tempId = `temp_${Date.now()}`;
    const visitorMsg: Message = { id: tempId, role: 'visitor', content: msg, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, visitorMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          visitorId: getVisitorId(),
          message: msg,
          currentPage: window.location.pathname,
        }),
      });
      const data = await res.json();

      if (!sessionId && data.sessionId) {
        setSessionIdState(data.sessionId);
        setSessionId(data.sessionId);
      }

      if (data.mode) setMode(data.mode);

      if (data.aiResponse) {
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          content: data.aiResponse,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => prev.filter((m) => m.id !== tempId).concat([
          { ...visitorMsg, id: `vis_${Date.now()}` },
          aiMsg,
        ]));
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setLoading(false);
    }
  }

  async function requestHuman() {
    if (!sessionId || humanRequested) return;
    setHumanRequested(true);

    await fetch('/api/chat/human-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    setMessages((prev) => [...prev, {
      id: `sys_${Date.now()}`,
      role: 'ai',
      content: 'Connecting you with our team. Please hold.',
      created_at: new Date().toISOString(),
    }]);

    let secs = 120;
    setHumanTimer(secs);
    humanTimerRef.current = setInterval(() => {
      secs--;
      setHumanTimer(secs);
      if (secs <= 0) {
        clearInterval(humanTimerRef.current);
        setHumanTimer(null);
        if (mode !== 'human') {
          setHumanRequested(false);
          setMessages((prev) => [...prev, {
            id: `sys_${Date.now()}`,
            role: 'ai',
            content: "Our team is unavailable right now. I'll continue helping you.",
            created_at: new Date().toISOString(),
          }]);
        }
      }
    }, 1000);
  }

  function handleOpen() {
    setOpen(true);
    setShowBadge(false);
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 'greeting',
          role: 'ai',
          content: "Hi, I'm Keentel's AI assistant. How can I help with your power engineering project today?",
          created_at: new Date().toISOString(),
        }]);
      }, 400);
    }
    setTimeout(() => inputRef.current?.focus(), 500);
  }

  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    if (sessionId && channelRef.current) {
      clearTimeout(typingTimeoutRef.current);
      channelRef.current.send({ type: 'broadcast', event: 'visitor_typing', payload: { text: e.target.value } });
    }
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .chat-widget { animation: slide-up 0.3s ease; }
        .dot-1 { animation: dot-bounce 1.2s infinite 0s; }
        .dot-2 { animation: dot-bounce 1.2s infinite 0.2s; }
        .dot-3 { animation: dot-bounce 1.2s infinite 0.4s; }
        .pulse-ring {
          position: absolute; inset: 0; border-radius: 9999px;
          border: 2px solid ${MAGENTA};
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {/* FLOATING BUBBLE */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${NAVY}, #0B1A5B)`, border: `2px solid ${MAGENTA}` }}
          aria-label="Open chat"
        >
          <div className="pulse-ring" />
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {showBadge && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: MAGENTA_DARK }}>1</span>
          )}
        </button>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <div
          className={`chat-widget fixed z-[9999] flex flex-col shadow-2xl ${isMobile ? 'inset-0' : 'bottom-6 right-6 w-[380px] h-[580px] rounded-2xl'}`}
          style={{ background: NAVY, border: `1px solid rgba(168,34,138,0.3)` }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #06103C, #0B1A5B)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="font-urbanist font-bold text-white text-sm">Keentel Engineering</p>
                <p className="text-[11px] flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: mode === 'human' ? '#22c55e' : MAGENTA }} />
                  {mode === 'human' ? 'Engineer online' : 'AI Assistant'}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: `${MAGENTA}40 transparent` }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                {msg.role !== 'visitor' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                )}
                <div
                  className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed font-jost"
                  style={msg.role === 'visitor'
                    ? { background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})`, color: '#fff', borderBottomRightRadius: 4 }
                    : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.9)', borderBottomLeftRadius: 4 }}
                >
                  {msg.role === 'agent' && msg.agent_name && (
                    <p className="text-[10px] font-semibold mb-1" style={{ color: MAGENTA_DARK }}>{msg.agent_name}</p>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {(loading || agentTyping) && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="rounded-2xl px-4 py-3 flex gap-1 items-center" style={{ background: 'rgba(255,255,255,0.07)', borderBottomLeftRadius: 4 }}>
                  <div className="w-2 h-2 rounded-full dot-1" style={{ background: MAGENTA }} />
                  <div className="w-2 h-2 rounded-full dot-2" style={{ background: MAGENTA }} />
                  <div className="w-2 h-2 rounded-full dot-3" style={{ background: MAGENTA }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* HUMAN TIMER */}
          {humanTimer !== null && mode !== 'human' && (
            <div className="px-4 py-2 text-center text-xs font-jost" style={{ background: 'rgba(168,34,138,0.15)', color: MAGENTA_DARK }}>
              Connecting with team… {Math.floor(humanTimer / 60)}:{String(humanTimer % 60).padStart(2, '0')}
            </div>
          )}

          {/* INPUT AREA */}
          <div className="px-4 pb-4 pt-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {!humanRequested && mode === 'ai' && messages.length > 0 && (
              <button
                onClick={requestHuman}
                className="w-full text-center text-[11px] mb-2 py-1.5 rounded-full font-jost font-medium transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Talk to a Human
              </button>
            )}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleTyping}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about our services…"
                className="flex-1 rounded-full px-4 py-2.5 text-sm font-jost outline-none text-white placeholder-white/30"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${MAGENTA_DARK})` }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
            <p className="text-center text-[10px] mt-2 font-jost" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Keentel Engineering AI · Powered by Claude
            </p>
          </div>
        </div>
      )}
    </>
  );
}
