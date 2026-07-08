'use client';
import { useState } from 'react';
import AgentDashboard from './AgentDashboard';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'keentel2026';

export default function AdminChatPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('keentel_admin_auth') === 'true';
  });
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function login() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('keentel_admin_auth', 'true');
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#06103C' }}>
        <div className="rounded-2xl p-10 w-full max-w-sm" style={{ background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.08)' }}>
          <img src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png" alt="Keentel" className="h-8 w-auto brightness-0 invert mx-auto mb-8" />
          <h1 className="font-urbanist font-black text-white text-xl text-center mb-6">Agent Dashboard</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl text-white outline-none mb-3 font-jost"
            style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.12)'}` }}
          />
          {error && <p className="text-red-400 text-xs text-center mb-3 font-jost">Incorrect password</p>}
          <button onClick={login} className="w-full py-3 rounded-xl text-white font-semibold font-jost"
            style={{ background: 'linear-gradient(135deg, #A8228A, #C72E9E)' }}>
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <AgentDashboard />;
}
