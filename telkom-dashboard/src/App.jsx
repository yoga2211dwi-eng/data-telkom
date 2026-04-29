import React, { useState, useEffect, useRef } from 'react';

/* ─── TELKOM COLOR SYSTEM ─── */
const COLORS = {
  telkomRed: '#CC0000',
  telkomRedDark: '#990000',
  telkomRedLight: '#FF1A1A',
  telkomRedMuted: '#FFE5E5',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  white: '#FFFFFF',
  green: '#10B981',
  yellow: '#F59E0B',
  blue: '#3B82F6',
};

/* ─── GLOBAL STYLES ─── */
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: ${COLORS.gray50};
    color: ${COLORS.gray800};
    font-size: 13px;
    line-height: 1.5;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: ${COLORS.gray100}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.gray300}; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: ${COLORS.telkomRed}; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
`;

/* ─── INJECT STYLES ─── */
const injectStyle = (css) => {
  if (typeof document !== 'undefined') {
    const el = document.getElementById('alista-global') || document.createElement('style');
    el.id = 'alista-global';
    el.textContent = css;
    if (!document.getElementById('alista-global')) document.head.appendChild(el);
  }
};

/* ─── SVG ICONS ─── */
const Icon = ({ name, size = 16, color = 'currentColor', style = {} }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="6 9 12 15 18 9" /></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="9 18 15 12 9 6" /></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="20 6 9 17 4 12" /></svg>,
    checkCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    bar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    layers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    clipboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>,
    checkSquare: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    printer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
    maximize: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>,
  };
  return icons[name] || null;
};

/* ─── TOAST NOTIFICATION ─── */
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === 'success' ? COLORS.green : type === 'error' ? COLORS.telkomRed : COLORS.blue;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: bg, color: '#fff', padding: '12px 20px',
      borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'toastIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275)',
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 500, maxWidth: 360,
    }}>
      <Icon name={type === 'success' ? 'check' : type === 'error' ? 'x' : 'info'} size={16} color="#fff" />
      {msg}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 8, padding: 0 }}>
        <Icon name="x" size={14} color="#fff" />
      </button>
    </div>
  );
};

/* ─── MODAL ─── */
const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
      zIndex: 8888, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 16, padding: 32, maxWidth: 520, width: '90%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)', animation: 'fadeUp 0.25s ease',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.gray800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: COLORS.gray100, border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="x" size={16} color={COLORS.gray600} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ─── TOP NAVBAR ─── */
const TopNavbar = ({ onLogout, username, sidebarOpen, setSidebarOpen }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifData = [
    { id: 1, text: 'RSV-004 telah disetujui oleh TL', time: '5 menit lalu', unread: true },
    { id: 2, text: 'Budget PRJ-2026-005 perlu dicek', time: '1 jam lalu', unread: true },
    { id: 3, text: 'Material GDG-JKT-01 telah dikirim', time: '3 jam lalu', unread: false },
  ];
  const unreadCount = notifData.filter(n => n.unread).length;

  return (
    <header style={{
      height: 60, background: COLORS.telkomRed,
      display: 'flex', alignItems: 'center', paddingLeft: 20, paddingRight: 24,
      justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: '0 2px 12px rgba(204,0,0,0.3)',
    }}>
      {/* Left: Logo + Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          <Icon name="menu" size={18} color="#fff" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: COLORS.white, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, color: COLORS.telkomRed, fontSize: 18, letterSpacing: -1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}>T</div>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: 15, letterSpacing: 0.3, lineHeight: 1 }}>TelkomAkses</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 400, letterSpacing: 0.5 }}>ALISTA · Supply Chain</div>
          </div>
        </div>
      </div>

      {/* Center: Nav Links */}
      <nav style={{ display: 'flex', gap: 4 }}>
        {['HOME', "WHAT'S NEW", 'DIREKTORI', 'TIM', 'KONTAK'].map(link => (
          <button key={link} style={{
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.85)',
            padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 11,
            fontWeight: 600, letterSpacing: 0.6, fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
          >{link}</button>
        ))}
      </nav>

      {/* Right: Notif + Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Notif Bell */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
          }}>
            <Icon name="bell" size={16} color="#fff" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 7, right: 7, width: 8, height: 8,
                background: '#FCD34D', borderRadius: '50%', border: '2px solid ' + COLORS.telkomRed,
                animation: 'pulse-dot 2s infinite',
              }} />
            )}
          </button>
          {notifOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 44, width: 320, background: COLORS.white,
              borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', overflow: 'hidden',
              border: `1px solid ${COLORS.gray100}`, animation: 'fadeUp 0.2s ease',
            }}>
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${COLORS.gray100}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.gray800 }}>Notifikasi</span>
                <span style={{ fontSize: 11, color: COLORS.telkomRed, fontWeight: 600, cursor: 'pointer' }}>Tandai semua dibaca</span>
              </div>
              {notifData.map(n => (
                <div key={n.id} style={{
                  padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: n.unread ? 'rgba(204,0,0,0.03)' : 'transparent',
                  borderBottom: `1px solid ${COLORS.gray50}`, cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = n.unread ? 'rgba(204,0,0,0.03)' : 'transparent'}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.unread ? COLORS.telkomRed : COLORS.gray200, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 12, color: COLORS.gray700, lineHeight: 1.5 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: COLORS.gray400, marginTop: 3 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
            padding: '6px 12px 6px 8px', display: 'flex', alignItems: 'center', gap: 8,
            cursor: 'pointer', color: '#fff',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="user" size={14} color="#fff" />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{username || 'User'}</span>
            <Icon name="chevronDown" size={12} color="rgba(255,255,255,0.7)" />
          </button>
          {profileOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 44, width: 200, background: COLORS.white,
              borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', overflow: 'hidden',
              border: `1px solid ${COLORS.gray100}`, animation: 'fadeUp 0.2s ease',
            }}>
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${COLORS.gray100}` }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.gray800 }}>{username}</div>
                <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 2 }}>Supply Chain Officer</div>
              </div>
              {[
                { icon: 'user', label: 'Profil Saya' },
                { icon: 'settings', label: 'Pengaturan' },
              ].map(item => (
                <button key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: COLORS.gray700, fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'background 0.15s', textAlign: 'left',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <Icon name={item.icon} size={14} color={COLORS.gray500} />
                  {item.label}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${COLORS.gray100}` }}>
                <button onClick={onLogout} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: COLORS.telkomRed, fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'background 0.15s', textAlign: 'left', fontWeight: 600,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.telkomRedMuted}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <Icon name="logout" size={14} color={COLORS.telkomRed} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ─── SIDEBAR ─── */
const Sidebar = ({ activeTab, setActiveTab, open }) => {
  const [resvOpen, setResvOpen] = useState(true);
  const [pakaiOpen, setPakaiOpen] = useState(false);

  const NavItem = ({ icon, label, active, onClick, children, isGroup, open: groupOpen }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div>
        <button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '10px 16px', border: 'none', borderRadius: 10,
            background: active ? COLORS.telkomRed : hovered ? COLORS.gray100 : 'transparent',
            color: active ? '#fff' : hovered ? COLORS.gray700 : COLORS.gray600,
            cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13, fontWeight: active ? 600 : 500,
            transition: 'all 0.15s', marginBottom: 2, textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name={icon} size={16} color={active ? '#fff' : hovered ? COLORS.gray700 : COLORS.gray500} />
            {open && <span>{label}</span>}
          </div>
          {isGroup && open && (
            <Icon name="chevronDown" size={13}
              color={active ? '#fff' : COLORS.gray400}
              style={{ transform: groupOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          )}
        </button>
        {children}
      </div>
    );
  };

  const SubItem = ({ label, active, onClick, icon }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: '8px 14px 8px 40px', border: 'none', borderRadius: 8,
          background: active ? 'rgba(204,0,0,0.08)' : hovered ? COLORS.gray50 : 'transparent',
          color: active ? COLORS.telkomRed : hovered ? COLORS.gray700 : COLORS.gray500,
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12, fontWeight: active ? 600 : 400,
          transition: 'all 0.15s', marginBottom: 1, textAlign: 'left',
          borderLeft: active ? `3px solid ${COLORS.telkomRed}` : '3px solid transparent',
        }}
      >
        {icon && <Icon name={icon} size={13} color={active ? COLORS.telkomRed : COLORS.gray400} />}
        {label}
      </button>
    );
  };

  return (
    <aside style={{
      width: open ? 240 : 64, flexShrink: 0,
      background: COLORS.white, borderRight: `1px solid ${COLORS.gray200}`,
      height: 'calc(100vh - 60px)', overflowY: 'auto', overflowX: 'hidden',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 0,
      boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
    }}>
      {open && (
        <div style={{ padding: '4px 8px 16px', borderBottom: `1px solid ${COLORS.gray100}`, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray400, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Supply Chain Management
          </div>
        </div>
      )}

      <NavItem icon="home" label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />

      {open && <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray300, letterSpacing: 1.2, padding: '12px 8px 6px', textTransform: 'uppercase' }}>Material</div>}

      <NavItem icon="file" label="Resv Material" isGroup open={open} groupOpen={resvOpen}
        onClick={() => setResvOpen(!resvOpen)}
        active={false}
      >
        {resvOpen && open && (
          <div>
            {[
              { id: 'Buat Reservasi', icon: 'plus', label: 'Buat Reservasi' },
              { id: 'List Reservasi', icon: 'clipboard', label: 'List Reservasi' },
              { id: 'Approval Resv', icon: 'checkSquare', label: 'Approval Resv' },
              { id: 'Approval Resv TL', icon: 'checkCircle', label: 'Approval Resv TL' },
            ].map(item => (
              <SubItem key={item.id} label={item.label} icon={item.icon} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
            ))}
          </div>
        )}
      </NavItem>

      <NavItem icon="layers" label="Pemakaian" isGroup open={open} groupOpen={pakaiOpen}
        onClick={() => setPakaiOpen(!pakaiOpen)}
        active={false}
      >
        {pakaiOpen && open && (
          <div>
            {['Buat Pemakaian', 'List Pemakaian', 'Approval Pemakaian'].map(item => (
              <SubItem key={item} label={item} icon="chevronRight" active={activeTab === item} onClick={() => setActiveTab(item)} />
            ))}
          </div>
        )}
      </NavItem>

      {open && <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray300, letterSpacing: 1.2, padding: '12px 8px 6px', textTransform: 'uppercase' }}>Laporan</div>}

      <NavItem icon="bar" label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
      <NavItem icon="globe" label="Monitoring" active={activeTab === 'Monitoring'} onClick={() => setActiveTab('Monitoring')} />

      {open && (
        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${COLORS.gray100}`, padding: '12px 8px' }}>
          <div style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 500 }}>ALISTA v2.4.0</div>
          <div style={{ fontSize: 10, color: COLORS.gray300, marginTop: 2 }}>© 2026 Telkom Indonesia</div>
        </div>
      )}
    </aside>
  );
};

/* ─── PAGE HEADER ─── */
const PageHeader = ({ title, subtitle, actions }) => (
  <div style={{
    padding: '20px 28px 0',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
  }}>
    <div>
      <div style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: COLORS.telkomRed }}>ALISTA</span>
        <span>›</span>
        <span>{subtitle}</span>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray900, letterSpacing: -0.5 }}>{title}</h1>
    </div>
    {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
  </div>
);

/* ─── CARD ─── */
const Card = ({ title, children, padding = 24, actions }) => (
  <div style={{
    background: COLORS.white, borderRadius: 14, border: `1px solid ${COLORS.gray200}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden',
    animation: 'fadeUp 0.3s ease',
  }}>
    {title && (
      <div style={{
        padding: '16px 20px', borderBottom: `1px solid ${COLORS.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.gray800 }}>{title}</span>
        {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
      </div>
    )}
    <div style={{ padding }}>{children}</div>
  </div>
);

/* ─── STAT CARD ─── */
const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: COLORS.white, borderRadius: 14, padding: 20,
    border: `1px solid ${COLORS.gray200}`, display: 'flex', gap: 16, alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)', animation: 'fadeUp 0.35s ease',
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 12, background: color + '15',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon name={icon} size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.gray900, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 4, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

/* ─── BTN ─── */
const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, icon, type = 'button' }) => {
  const [hovered, setHovered] = useState(false);

  const styles = {
    primary: {
      bg: hovered ? COLORS.telkomRedDark : COLORS.telkomRed,
      color: '#fff', border: 'none',
    },
    secondary: {
      bg: hovered ? COLORS.gray100 : COLORS.white,
      color: COLORS.gray700, border: `1px solid ${COLORS.gray200}`,
    },
    ghost: {
      bg: hovered ? COLORS.gray100 : 'transparent',
      color: COLORS.gray600, border: 'none',
    },
    danger: {
      bg: hovered ? '#990000' : COLORS.telkomRed,
      color: '#fff', border: 'none',
    },
    success: {
      bg: hovered ? '#059669' : COLORS.green,
      color: '#fff', border: 'none',
    },
  };

  const s = styles[variant] || styles.primary;
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 28px' : '9px 18px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;

  return (
    <button type={type} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled ? COLORS.gray200 : s.bg,
        color: disabled ? COLORS.gray400 : s.color,
        border: s.border || 'none',
        borderRadius: 8, padding: pad, fontSize: fs, fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex',
        alignItems: 'center', gap: 6, transition: 'all 0.15s',
        fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap',
        boxShadow: variant === 'primary' && !disabled ? '0 2px 8px rgba(204,0,0,0.25)' : 'none',
      }}
    >
      {icon && <Icon name={icon} size={fs + 2} color={disabled ? COLORS.gray400 : s.color} />}
      {children}
    </button>
  );
};

/* ─── INPUT ─── */
const Input = ({ label, placeholder, type = 'text', value, onChange, required, note, icon, style: extStyle }) => (
  <div style={{ marginBottom: 0 }}>
    {label && (
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.gray700, marginBottom: 6 }}>
        {label} {required && <span style={{ color: COLORS.telkomRed }}>*</span>}
        {note && <span style={{ fontWeight: 400, color: COLORS.gray400, marginLeft: 4 }}>({note})</span>}
      </label>
    )}
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon name={icon} size={14} color={COLORS.gray400} />
        </div>
      )}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{
          width: '100%', padding: icon ? '9px 12px 9px 34px' : '9px 12px',
          border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8,
          fontSize: 13, color: COLORS.gray800, fontFamily: "'Plus Jakarta Sans', sans-serif",
          outline: 'none', transition: 'border-color 0.15s',
          background: COLORS.white, ...(extStyle || {}),
        }}
        onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
        onBlur={e => e.target.style.borderColor = COLORS.gray200}
      />
    </div>
  </div>
);

/* ─── FIELD ROW ─── */
const FieldRow = ({ label, required, note, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'flex-start', paddingBottom: 14, borderBottom: `1px solid ${COLORS.gray50}`, marginBottom: 14 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray700, paddingTop: 9, lineHeight: 1.4 }}>
      {label}
      {required && <span style={{ color: COLORS.telkomRed, marginLeft: 3 }}>*</span>}
      {note && <div style={{ fontWeight: 400, color: COLORS.gray400, fontSize: 11, marginTop: 2 }}>{note}</div>}
    </label>
    <div>{children}</div>
  </div>
);

/* ─── SEARCH INPUT ─── */
const SearchInput = ({ placeholder, style: ext }) => (
  <div style={{ position: 'relative', ...(ext || {}) }}>
    <Icon name="search" size={14} color={COLORS.gray400} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    <input placeholder={placeholder || 'Cari...'} style={{
      width: '100%', padding: '9px 12px 9px 34px',
      border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8,
      fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
      outline: 'none', color: COLORS.gray800, background: COLORS.white,
      transition: 'border-color 0.15s',
    }}
      onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
      onBlur={e => e.target.style.borderColor = COLORS.gray200}
    />
  </div>
);

/* ─── BADGE ─── */
const Badge = ({ label, color }) => {
  const map = {
    Pending: { bg: '#FEF3C7', text: '#D97706' },
    Approved: { bg: '#D1FAE5', text: '#059669' },
    Rejected: { bg: '#FEE2E2', text: '#DC2626' },
    'In Progress': { bg: '#DBEAFE', text: '#2563EB' },
  };
  const s = map[label] || { bg: COLORS.gray100, text: COLORS.gray600 };
  return (
    <span style={{
      background: s.bg, color: s.text, padding: '3px 10px',
      borderRadius: 99, fontSize: 11, fontWeight: 600, display: 'inline-block',
    }}>{label}</span>
  );
};

/* ─── TABLE ─── */
const Table = ({ columns, rows, onRowAction }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: COLORS.gray50 }}>
          {columns.map(col => (
            <th key={col.key} style={{
              padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700,
              color: COLORS.gray500, letterSpacing: 0.5, textTransform: 'uppercase',
              borderBottom: `2px solid ${COLORS.gray200}`, whiteSpace: 'nowrap',
            }}>{col.label}</th>
          ))}
          {onRowAction && <th style={{ padding: '10px 14px', borderBottom: `2px solid ${COLORS.gray200}`, textAlign: 'center', fontSize: 11, fontWeight: 700, color: COLORS.gray500, letterSpacing: 0.5, textTransform: 'uppercase' }}>AKSI</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${COLORS.gray100}`, transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 14px', color: COLORS.gray700, verticalAlign: 'middle' }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {onRowAction && (
              <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                {onRowAction(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ────────────────────────────────────────────
   HOME PAGE
──────────────────────────────────────────── */
const HomePage = ({ username, setActiveTab }) => {
  const recent = [
    { id: 'RSV-004', tanggal: '2026-04-21', gudang: 'GDG-JKT-01', status: 'Pending' },
    { id: 'RSV-003', tanggal: '2026-04-20', gudang: 'GDG-SBY-01', status: 'Approved' },
    { id: 'RSV-002', tanggal: '2026-04-19', gudang: 'GDG-BDG-02', status: 'Approved' },
  ];

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.telkomRed} 0%, ${COLORS.telkomRedDark} 60%, #660000 100%)`,
        borderRadius: 16, padding: '28px 32px', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 6 }}>Selamat datang kembali,</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10, position: 'relative' }}>
          {(username || 'User').toUpperCase()} 👋
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', maxWidth: 480, lineHeight: 1.6 }}>
          Portal ALISTA siap membantu pengelolaan reservasi dan pemakaian material Anda hari ini.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button onClick={() => setActiveTab('Buat Reservasi')} style={{
            background: '#fff', color: COLORS.telkomRed, border: 'none', borderRadius: 8,
            padding: '9px 20px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 6,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Icon name="plus" size={14} color={COLORS.telkomRed} /> Buat Reservasi
          </button>
          <button onClick={() => setActiveTab('List Reservasi')} style={{
            background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 8, padding: '9px 20px', fontWeight: 600, fontSize: 12, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Lihat Semua
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Total Reservasi" value="47" icon="file" color={COLORS.telkomRed} sub="↑ 12% bulan ini" />
        <StatCard label="Menunggu Approval" value="8" icon="clipboard" color={COLORS.yellow} sub="3 urgent" />
        <StatCard label="Disetujui" value="36" icon="checkCircle" color={COLORS.green} sub="Bulan April" />
        <StatCard label="Material Tersedia" value="1.2K" icon="package" color={COLORS.blue} sub="Di 5 gudang" />
      </div>

      {/* Recent Reservasi */}
      <Card title="Reservasi Terbaru" actions={
        <Btn variant="ghost" size="sm" onClick={() => setActiveTab('List Reservasi')}>Lihat Semua →</Btn>
      }>
        <Table
          columns={[
            { key: 'id', label: 'No Reservasi', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: COLORS.telkomRed, fontSize: 12 }}>{v}</span> },
            { key: 'tanggal', label: 'Tanggal' },
            { key: 'gudang', label: 'Gudang' },
            { key: 'status', label: 'Status', render: v => <Badge label={v} /> },
          ]}
          rows={recent}
          onRowAction={(row) => (
            <Btn variant="secondary" size="sm" icon="eye">Detail</Btn>
          )}
        />
      </Card>
    </div>
  );
};

/* ────────────────────────────────────────────
   BUAT RESERVASI
──────────────────────────────────────────── */
const BuatReservasi = ({ showToast }) => {
  const [materials, setMaterials] = useState([{ id: 1, kode: '', nama: '', qty: '', satuan: '' }]);
  const [form, setForm] = useState({ tanggal: '', gudang: '', project: '', lokasi: '', nik: '', wo: '' });
  const [fileEvident, setFileEvident] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const addMaterial = () => {
    setMaterials(p => [...p, { id: Date.now(), kode: '', nama: '', qty: '', satuan: '' }]);
  };

  const removeMaterial = (id) => {
    if (materials.length === 1) return;
    setMaterials(p => p.filter(m => m.id !== id));
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(p => p.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSubmit = () => {
    setConfirmOpen(false);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Reservasi berhasil dikirim! RSV-' + Math.floor(Math.random() * 900 + 100), 'success');
      setForm({ tanggal: '', gudang: '', project: '', lokasi: '', nik: '', wo: '' });
      setMaterials([{ id: 1, kode: '', nama: '', qty: '', satuan: '' }]);
      setFileEvident(null);
    }, 1600);
  };

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Buat Reservasi" subtitle="Resv Material"
        actions={<Btn variant="secondary" size="sm" icon="refresh">Reset Form</Btn>}
      />

      {/* Info Banner */}
      <div style={{
        background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10,
        padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <Icon name="info" size={16} color={COLORS.blue} style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.7 }}>
          <strong>Petunjuk Pengisian:</strong> Lengkapi semua field yang bertanda <span style={{ color: COLORS.telkomRed }}>*</span>. Upload file evident, dan pastikan tidak ada material yang sama dalam satu reservasi — komulatifkan jumlahnya. Data yang sudah disubmit tidak dapat diubah.
        </div>
      </div>

      <Card title="Informasi Reservasi">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="Est Tanggal Pengambilan" required>
            <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
              style={{
                padding: '9px 12px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8,
                fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.gray800, outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
              onBlur={e => e.target.style.borderColor = COLORS.gray200}
            />
          </FieldRow>

          <FieldRow label="Gudang Pengambilan" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Kode Gudang" value={form.gudang} onChange={e => setForm({ ...form, gudang: e.target.value })} style={{ width: 160 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
              <Input placeholder="Nama Gudang" style={{ flex: 1 }} />
            </div>
          </FieldRow>

          <FieldRow label="Project ID" required>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Input placeholder="Project ID" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} style={{ width: 180 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
              <Input placeholder="Nama Project" style={{ flex: 1 }} />
              <Btn variant="success" size="sm" icon="check">Cek Budget</Btn>
            </div>
          </FieldRow>

          <FieldRow label="Peruntukan" note="Kosongkan jika swakelola">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Vendor Number" style={{ width: 180 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
              <Input placeholder="Nama Vendor" style={{ flex: 1 }} />
            </div>
          </FieldRow>

          <FieldRow label="Mengacu ke PO" note="Kosongkan jika swakelola atau Non Recurring">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="PO Number" style={{ width: 200 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
            </div>
          </FieldRow>

          <FieldRow label="Upload Evident" required>
            <div style={{
              border: `2px dashed ${fileEvident ? COLORS.green : COLORS.gray200}`,
              borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center',
              gap: 12, background: fileEvident ? '#D1FAE5' : COLORS.gray50, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = fileEvident ? COLORS.green : COLORS.telkomRed}
              onMouseLeave={e => e.currentTarget.style.borderColor = fileEvident ? COLORS.green : COLORS.gray200}
            >
              <Icon name={fileEvident ? 'check' : 'upload'} size={20} color={fileEvident ? COLORS.green : COLORS.gray400} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: fileEvident ? COLORS.green : COLORS.gray700 }}>
                  {fileEvident ? fileEvident.name : 'Klik atau drag file ke sini'}
                </div>
                <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 2 }}>PDF, JPG, PNG — maks 10MB</div>
              </div>
              <input type="file" style={{ display: 'none' }} onChange={e => setFileEvident(e.target.files[0])} />
            </div>
          </FieldRow>

          <FieldRow label="Lokasi Project" required>
            <Input placeholder="Alamat / lokasi proyek" value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} />
          </FieldRow>

          <FieldRow label="NIK Pemakai" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Ketikkan NIK Pemakai" value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} style={{ width: 200 }} />
              <Input placeholder="Nama Pemakai" style={{ flex: 1 }} />
            </div>
          </FieldRow>

          <FieldRow label="Work Order (WO)">
            <Input placeholder="Nomor Work Order" value={form.wo} onChange={e => setForm({ ...form, wo: e.target.value })} />
          </FieldRow>
        </div>
      </Card>

      {/* Material Table */}
      <Card title="Detail Material"
        actions={<Btn variant="primary" size="sm" icon="plus" onClick={addMaterial}>Tambah Baris</Btn>}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.gray50 }}>
                {['No', 'Kode Material', 'Nama Material', 'Qty', 'Satuan', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700,
                    color: COLORS.gray500, letterSpacing: 0.5, borderBottom: `2px solid ${COLORS.gray200}`,
                    textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, i) => (
                <tr key={mat.id} style={{ borderBottom: `1px solid ${COLORS.gray100}` }}>
                  <td style={{ padding: '8px 12px', color: COLORS.gray400, fontWeight: 600, width: 40 }}>{i + 1}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <input value={mat.kode} onChange={e => updateMaterial(mat.id, 'kode', e.target.value)}
                      placeholder="Kode Material"
                      style={{ width: 130, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
                      onBlur={e => e.target.style.borderColor = COLORS.gray200}
                    />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input value={mat.nama} onChange={e => updateMaterial(mat.id, 'nama', e.target.value)}
                      placeholder="Nama Material"
                      style={{ width: '100%', padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', minWidth: 200 }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
                      onBlur={e => e.target.style.borderColor = COLORS.gray200}
                    />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input type="number" value={mat.qty} onChange={e => updateMaterial(mat.id, 'qty', e.target.value)}
                      placeholder="0"
                      style={{ width: 80, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
                      onBlur={e => e.target.style.borderColor = COLORS.gray200}
                    />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <select value={mat.satuan} onChange={e => updateMaterial(mat.id, 'satuan', e.target.value)}
                      style={{ width: 90, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', background: COLORS.white }}
                    >
                      <option value="">Pilih</option>
                      {['Pcs', 'Unit', 'Meter', 'Rol', 'Box', 'Set', 'Kg'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <button onClick={() => removeMaterial(mat.id)} disabled={materials.length === 1}
                      style={{
                        background: materials.length === 1 ? COLORS.gray100 : '#FEE2E2', border: 'none',
                        borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: materials.length === 1 ? 'not-allowed' : 'pointer', color: materials.length === 1 ? COLORS.gray300 : COLORS.telkomRed,
                      }}>
                      <Icon name="trash" size={13} color={materials.length === 1 ? COLORS.gray300 : COLORS.telkomRed} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${COLORS.gray100}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: COLORS.gray400 }}>{materials.length} material ditambahkan</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" icon="x">Batal</Btn>
            <Btn variant="primary" icon="check" onClick={() => setConfirmOpen(true)} disabled={submitting}>
              {submitting ? 'Memproses...' : 'Submit Reservasi'}
            </Btn>
          </div>
        </div>
      </Card>

      <Modal open={confirmOpen} title="Konfirmasi Submit" onClose={() => setConfirmOpen(false)}>
        <p style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 1.7 }}>
          Pastikan semua data yang diinput sudah benar. Setelah disubmit, reservasi <strong>tidak dapat diubah</strong>. Lanjutkan?
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" onClick={() => setConfirmOpen(false)}>Batal</Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>Ya, Submit</Btn>
        </div>
      </Modal>
    </div>
  );
};

/* ────────────────────────────────────────────
   LIST RESERVASI
──────────────────────────────────────────── */
const ListReservasi = ({ showToast }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const allData = [
    { id: 'RSV-001', tanggal: '2026-04-18', gudang: 'GDG-JKT-01', project: 'PRJ-2026-001', pemohon: 'Budi Santoso', status: 'Approved', material: 3 },
    { id: 'RSV-002', tanggal: '2026-04-19', gudang: 'GDG-BDG-02', project: 'PRJ-2026-002', pemohon: 'Siti Rahma', status: 'Approved', material: 5 },
    { id: 'RSV-003', tanggal: '2026-04-20', gudang: 'GDG-SBY-01', project: 'PRJ-2026-003', pemohon: 'Ahmad Fauzi', status: 'Rejected', material: 2 },
    { id: 'RSV-004', tanggal: '2026-04-21', gudang: 'GDG-JKT-01', project: 'PRJ-2026-004', pemohon: 'Yoga Pratama', status: 'Pending', material: 4 },
    { id: 'RSV-005', tanggal: '2026-04-22', gudang: 'GDG-MKS-01', project: 'PRJ-2026-005', pemohon: 'Dewi Lestari', status: 'In Progress', material: 7 },
  ];

  const filtered = allData.filter(row =>
    (filterStatus === 'Semua' || row.status === filterStatus) &&
    (row.id.toLowerCase().includes(search.toLowerCase()) || row.pemohon.toLowerCase().includes(search.toLowerCase()) || row.project.toLowerCase().includes(search.toLowerCase()))
  );

  const statuses = ['Semua', 'Pending', 'In Progress', 'Approved', 'Rejected'];

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="List Reservasi" subtitle="Resv Material"
        actions={
          <>
            <Btn variant="secondary" size="sm" icon="download">Export</Btn>
            <Btn variant="secondary" size="sm" icon="printer">Cetak</Btn>
          </>
        }
      />

      <Card>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          <SearchInput placeholder="Cari ID, pemohon, project..." style={{ flex: 1, minWidth: 220 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            <Icon name="filter" size={14} color={COLORS.gray400} style={{ alignSelf: 'center' }} />
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                padding: '6px 14px', borderRadius: 8, border: `1.5px solid ${filterStatus === s ? COLORS.telkomRed : COLORS.gray200}`,
                background: filterStatus === s ? COLORS.telkomRed : COLORS.white,
                color: filterStatus === s ? '#fff' : COLORS.gray600,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.15s',
              }}>{s}</button>
            ))}
          </div>
        </div>

        <Table
          columns={[
            { key: 'id', label: 'No Reservasi', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.telkomRed, fontSize: 12 }}>{v}</span> },
            { key: 'tanggal', label: 'Tanggal' },
            { key: 'gudang', label: 'Gudang' },
            { key: 'project', label: 'Project' },
            { key: 'pemohon', label: 'Pemohon' },
            { key: 'material', label: 'Jml Material', render: v => <span style={{ fontWeight: 700, color: COLORS.gray700 }}>{v} item</span> },
            { key: 'status', label: 'Status', render: v => <Badge label={v} /> },
          ]}
          rows={filtered}
          onRowAction={(row) => (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              <button onClick={() => { setSelectedRow(row); setDetailOpen(true); }} style={{
                background: COLORS.gray100, border: 'none', borderRadius: 6, padding: '5px 10px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: COLORS.gray700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <Icon name="eye" size={12} color={COLORS.gray500} /> Detail
              </button>
              <button onClick={() => showToast('Dokumen RSV diunduh', 'success')} style={{
                background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '5px 10px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: COLORS.blue,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <Icon name="download" size={12} color={COLORS.blue} />
              </button>
            </div>
          )}
        />

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: COLORS.gray400 }}>Menampilkan {filtered.length} dari {allData.length} data</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(p => (
              <button key={p} style={{
                width: 32, height: 32, borderRadius: 7,
                background: p === 1 ? COLORS.telkomRed : COLORS.white,
                border: `1px solid ${p === 1 ? COLORS.telkomRed : COLORS.gray200}`,
                color: p === 1 ? '#fff' : COLORS.gray600,
                cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      <Modal open={detailOpen} title={`Detail Reservasi ${selectedRow?.id}`} onClose={() => setDetailOpen(false)}>
        {selectedRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['No Reservasi', selectedRow.id],
              ['Tanggal', selectedRow.tanggal],
              ['Gudang', selectedRow.gudang],
              ['Project', selectedRow.project],
              ['Pemohon', selectedRow.pemohon],
              ['Jumlah Material', selectedRow.material + ' item'],
              ['Status', selectedRow.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${COLORS.gray100}` }}>
                <span style={{ fontSize: 12, color: COLORS.gray500, fontWeight: 500 }}>{k}</span>
                {k === 'Status' ? <Badge label={v} /> : <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray800 }}>{v}</span>}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <Btn variant="secondary" onClick={() => setDetailOpen(false)}>Tutup</Btn>
              <Btn variant="primary" icon="download" onClick={() => { showToast('Dokumen diunduh', 'success'); setDetailOpen(false); }}>Download PDF</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

/* ────────────────────────────────────────────
   APPROVAL PAGE
──────────────────────────────────────────── */
const ApprovalPage = ({ title, showToast }) => {
  const [data, setData] = useState([
    { id: 'RSV-006', tanggal: '2026-04-22', gudang: 'GDG-JKT-01', project: 'PRJ-2026-006', pemohon: 'Reza Firmansyah', material: 3, status: 'Pending' },
    { id: 'RSV-007', tanggal: '2026-04-22', gudang: 'GDG-BDG-02', project: 'PRJ-2026-007', pemohon: 'Nurul Hidayah', material: 6, status: 'Pending' },
  ]);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectNote, setRejectNote] = useState('');

  const approve = (id) => {
    setData(p => p.filter(r => r.id !== id));
    showToast(`${id} telah disetujui`, 'success');
  };

  const reject = () => {
    setData(p => p.filter(r => r.id !== rejectModal));
    showToast(`${rejectModal} telah ditolak`, 'error');
    setRejectModal(null);
    setRejectNote('');
  };

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title={title} subtitle="Resv Material" />

      {data.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Icon name="checkCircle" size={52} color={COLORS.green} />
            <p style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: COLORS.gray700 }}>Semua bersih!</p>
            <p style={{ marginTop: 6, fontSize: 13, color: COLORS.gray400 }}>Tidak ada reservasi yang menunggu approval.</p>
          </div>
        </Card>
      ) : (
        <Card title={`${data.length} Reservasi Menunggu Approval`}>
          <Table
            columns={[
              { key: 'id', label: 'No Reservasi', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.telkomRed, fontSize: 12 }}>{v}</span> },
              { key: 'tanggal', label: 'Tanggal' },
              { key: 'gudang', label: 'Gudang' },
              { key: 'project', label: 'Project' },
              { key: 'pemohon', label: 'Pemohon' },
              { key: 'material', label: 'Material', render: v => v + ' item' },
            ]}
            rows={data}
            onRowAction={(row) => (
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <button onClick={() => approve(row.id)} style={{
                  background: '#D1FAE5', border: 'none', borderRadius: 6, padding: '5px 12px',
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, color: COLORS.green,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Icon name="check" size={12} color={COLORS.green} /> Setuju
                </button>
                <button onClick={() => setRejectModal(row.id)} style={{
                  background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 12px',
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, color: COLORS.telkomRed,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Icon name="x" size={12} color={COLORS.telkomRed} /> Tolak
                </button>
              </div>
            )}
          />
        </Card>
      )}

      <Modal open={!!rejectModal} title="Tolak Reservasi" onClose={() => setRejectModal(null)}>
        <p style={{ fontSize: 13, color: COLORS.gray600, marginBottom: 16 }}>Berikan alasan penolakan untuk <strong>{rejectModal}</strong>:</p>
        <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)}
          placeholder="Tulis alasan penolakan..."
          style={{
            width: '100%', height: 100, padding: '10px 12px', border: `1.5px solid ${COLORS.gray200}`,
            borderRadius: 8, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", resize: 'vertical', outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
          onBlur={e => e.target.style.borderColor = COLORS.gray200}
        />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setRejectModal(null)}>Batal</Btn>
          <Btn variant="danger" icon="x" onClick={reject}>Tolak Reservasi</Btn>
        </div>
      </Modal>
    </div>
  );
};

/* ────────────────────────────────────────────
   DASHBOARD PAGE
──────────────────────────────────────────── */
const DashboardPage = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
  const vals = [12, 19, 14, 27, 22, 31];
  const maxV = Math.max(...vals);

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Dashboard" subtitle="Laporan" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Total Reservasi" value="47" icon="file" color={COLORS.telkomRed} sub="YTD 2026" />
        <StatCard label="Disetujui" value="36" icon="checkCircle" color={COLORS.green} sub="76.6% approval rate" />
        <StatCard label="Ditolak" value="4" icon="x" color={COLORS.yellow} sub="8.5%" />
        <StatCard label="On Process" value="7" icon="refresh" color={COLORS.blue} sub="Aktif" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card title="Tren Reservasi 6 Bulan Terakhir">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, paddingBottom: 8 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600 }}>{vals[i]}</span>
                <div style={{
                  width: '100%', background: i === months.length - 1 ? COLORS.telkomRed : COLORS.gray200,
                  borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease',
                  height: (vals[i] / maxV) * 120,
                }} />
                <span style={{ fontSize: 11, color: COLORS.gray400 }}>{m}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Status Distribusi">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Approved', val: 76, color: COLORS.green },
              { label: 'Pending', val: 15, color: COLORS.yellow },
              { label: 'Rejected', val: 9, color: COLORS.telkomRed },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: COLORS.gray600, fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.val}%</span>
                </div>
                <div style={{ height: 8, background: COLORS.gray100, borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: s.val + '%', background: s.color, borderRadius: 99, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   BUAT PEMAKAIAN
──────────────────────────────────────────── */
const BuatPemakaian = ({ showToast }) => {
  const [materials, setMaterials] = useState([{ id: 1, kode: '', nama: '', qty: '', satuan: '' }]);
  const [form, setForm] = useState({ tanggal: '', gudang: '', project: '', lokasi: '', nik: '', wo: '' });
  const [fileEvident, setFileEvident] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const addMaterial = () => setMaterials(p => [...p, { id: Date.now(), kode: '', nama: '', qty: '', satuan: '' }]);
  const removeMaterial = (id) => { if (materials.length > 1) setMaterials(p => p.filter(m => m.id !== id)); };
  const updateMaterial = (id, field, value) => setMaterials(p => p.map(m => m.id === id ? { ...m, [field]: value } : m));

  const handleSubmit = () => {
    setConfirmOpen(false);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Pemakaian berhasil dikirim! PMK-' + Math.floor(Math.random() * 900 + 100), 'success');
      setForm({ tanggal: '', gudang: '', project: '', lokasi: '', nik: '', wo: '' });
      setMaterials([{ id: 1, kode: '', nama: '', qty: '', satuan: '' }]);
      setFileEvident(null);
    }, 1600);
  };

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Buat Pemakaian" subtitle="Pemakaian Material"
        actions={<Btn variant="secondary" size="sm" icon="refresh">Reset Form</Btn>}
      />
      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="info" size={16} color="#EA580C" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 12, color: '#9A3412', lineHeight: 1.7 }}>
          <strong>Petunjuk Pemakaian:</strong> Formulir ini digunakan untuk mencatat pemakaian material dari gudang. Pastikan nomor reservasi sudah disetujui sebelum mengajukan pemakaian.
        </div>
      </div>
      <Card title="Informasi Pemakaian">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="No. Reservasi" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Cari No. Reservasi" style={{ width: 200 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
            </div>
          </FieldRow>
          <FieldRow label="Tanggal Pemakaian" required>
            <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
              style={{ padding: '9px 12px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.gray800, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
              onBlur={e => e.target.style.borderColor = COLORS.gray200}
            />
          </FieldRow>
          <FieldRow label="Gudang Pengambilan" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Kode Gudang" value={form.gudang} onChange={e => setForm({ ...form, gudang: e.target.value })} style={{ width: 160 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
              <Input placeholder="Nama Gudang" style={{ flex: 1 }} />
            </div>
          </FieldRow>
          <FieldRow label="Project ID" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="Project ID" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} style={{ width: 180 }} />
              <Btn variant="secondary" size="sm" icon="search">Cari</Btn>
              <Input placeholder="Nama Project" style={{ flex: 1 }} />
            </div>
          </FieldRow>
          <FieldRow label="Upload Berita Acara" required>
            <div style={{
              border: `2px dashed ${fileEvident ? COLORS.green : COLORS.gray200}`,
              borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center',
              gap: 12, background: fileEvident ? '#D1FAE5' : COLORS.gray50, cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = fileEvident ? COLORS.green : COLORS.telkomRed}
              onMouseLeave={e => e.currentTarget.style.borderColor = fileEvident ? COLORS.green : COLORS.gray200}
              onClick={() => document.getElementById('pemakaian-upload').click()}
            >
              <Icon name={fileEvident ? 'check' : 'upload'} size={20} color={fileEvident ? COLORS.green : COLORS.gray400} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: fileEvident ? COLORS.green : COLORS.gray700 }}>
                  {fileEvident ? fileEvident.name : 'Klik atau drag file ke sini'}
                </div>
                <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 2 }}>PDF, JPG, PNG — maks 10MB</div>
              </div>
              <input id="pemakaian-upload" type="file" style={{ display: 'none' }} onChange={e => setFileEvident(e.target.files[0])} />
            </div>
          </FieldRow>
          <FieldRow label="NIK Pemakai" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="NIK Pemakai" value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} style={{ width: 200 }} />
              <Input placeholder="Nama Pemakai" style={{ flex: 1 }} />
            </div>
          </FieldRow>
          <FieldRow label="Lokasi Pemakaian" required>
            <Input placeholder="Alamat / lokasi proyek" value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} />
          </FieldRow>
        </div>
      </Card>
      <Card title="Detail Material Dipakai" actions={<Btn variant="primary" size="sm" icon="plus" onClick={addMaterial}>Tambah Baris</Btn>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.gray50 }}>
                {['No', 'Kode Material', 'Nama Material', 'Qty Reservasi', 'Qty Pakai', 'Satuan', ''].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: COLORS.gray500, letterSpacing: 0.5, borderBottom: `2px solid ${COLORS.gray200}`, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, i) => (
                <tr key={mat.id} style={{ borderBottom: `1px solid ${COLORS.gray100}` }}>
                  <td style={{ padding: '8px 12px', color: COLORS.gray400, fontWeight: 600, width: 40 }}>{i + 1}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <input value={mat.kode} onChange={e => updateMaterial(mat.id, 'kode', e.target.value)} placeholder="Kode Material"
                      style={{ width: 130, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed} onBlur={e => e.target.style.borderColor = COLORS.gray200} />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input value={mat.nama} onChange={e => updateMaterial(mat.id, 'nama', e.target.value)} placeholder="Nama Material"
                      style={{ width: '100%', padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', minWidth: 200 }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed} onBlur={e => e.target.style.borderColor = COLORS.gray200} />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input type="number" placeholder="0" style={{ width: 70, padding: '7px 10px', border: `1.5px solid ${COLORS.gray100}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', background: COLORS.gray50, color: COLORS.gray400 }} readOnly />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input type="number" value={mat.qty} onChange={e => updateMaterial(mat.id, 'qty', e.target.value)} placeholder="0"
                      style={{ width: 80, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = COLORS.telkomRed} onBlur={e => e.target.style.borderColor = COLORS.gray200} />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <select value={mat.satuan} onChange={e => updateMaterial(mat.id, 'satuan', e.target.value)}
                      style={{ width: 90, padding: '7px 10px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 7, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', background: COLORS.white }}>
                      <option value="">Pilih</option>
                      {['Pcs', 'Unit', 'Meter', 'Rol', 'Box', 'Set', 'Kg'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <button onClick={() => removeMaterial(mat.id)} disabled={materials.length === 1}
                      style={{ background: materials.length === 1 ? COLORS.gray100 : '#FEE2E2', border: 'none', borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: materials.length === 1 ? 'not-allowed' : 'pointer' }}>
                      <Icon name="trash" size={13} color={materials.length === 1 ? COLORS.gray300 : COLORS.telkomRed} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${COLORS.gray100}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: COLORS.gray400 }}>{materials.length} material ditambahkan</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" icon="x">Batal</Btn>
            <Btn variant="primary" icon="check" onClick={() => setConfirmOpen(true)} disabled={submitting}>
              {submitting ? 'Memproses...' : 'Submit Pemakaian'}
            </Btn>
          </div>
        </div>
      </Card>
      <Modal open={confirmOpen} title="Konfirmasi Submit Pemakaian" onClose={() => setConfirmOpen(false)}>
        <p style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 1.7 }}>
          Pastikan semua data pemakaian sudah benar. Setelah disubmit, data <strong>tidak dapat diubah</strong>. Lanjutkan?
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" onClick={() => setConfirmOpen(false)}>Batal</Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>Ya, Submit</Btn>
        </div>
      </Modal>
    </div>
  );
};

/* ────────────────────────────────────────────
   LIST PEMAKAIAN
──────────────────────────────────────────── */
const ListPemakaian = ({ showToast }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(null);

  const allData = [
    { id: 'PMK-001', tanggal: '2026-04-18', gudang: 'GDG-JKT-01', project: 'PRJ-2026-001', pemohon: 'Budi Santoso', status: 'Approved', material: 3, reservasi: 'RSV-001' },
    { id: 'PMK-002', tanggal: '2026-04-19', gudang: 'GDG-BDG-02', project: 'PRJ-2026-002', pemohon: 'Siti Rahma', status: 'Approved', material: 5, reservasi: 'RSV-002' },
    { id: 'PMK-003', tanggal: '2026-04-20', gudang: 'GDG-SBY-01', project: 'PRJ-2026-003', pemohon: 'Ahmad Fauzi', status: 'Rejected', material: 2, reservasi: 'RSV-003' },
    { id: 'PMK-004', tanggal: '2026-04-21', gudang: 'GDG-JKT-01', project: 'PRJ-2026-004', pemohon: 'Yoga Pratama', status: 'Pending', material: 4, reservasi: 'RSV-004' },
    { id: 'PMK-005', tanggal: '2026-04-22', gudang: 'GDG-MKS-01', project: 'PRJ-2026-005', pemohon: 'Dewi Lestari', status: 'In Progress', material: 7, reservasi: 'RSV-005' },
  ];

  const filtered = allData.filter(row =>
    (filterStatus === 'Semua' || row.status === filterStatus) &&
    (row.id.toLowerCase().includes(search.toLowerCase()) || row.pemohon.toLowerCase().includes(search.toLowerCase()) || row.project.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="List Pemakaian" subtitle="Pemakaian Material"
        actions={
          <>
            <Btn variant="secondary" size="sm" icon="download">Export</Btn>
            <Btn variant="secondary" size="sm" icon="printer">Cetak</Btn>
          </>
        }
      />
      <Card>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Icon name="search" size={14} color={COLORS.gray400} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input placeholder="Cari ID, pemohon, project..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 34px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', color: COLORS.gray800, background: COLORS.white }}
              onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
              onBlur={e => e.target.style.borderColor = COLORS.gray200}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Semua', 'Pending', 'In Progress', 'Approved', 'Rejected'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                padding: '6px 14px', borderRadius: 8, border: `1.5px solid ${filterStatus === s ? COLORS.telkomRed : COLORS.gray200}`,
                background: filterStatus === s ? COLORS.telkomRed : COLORS.white,
                color: filterStatus === s ? '#fff' : COLORS.gray600,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{s}</button>
            ))}
          </div>
        </div>
        <Table
          columns={[
            { key: 'id', label: 'No Pemakaian', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.telkomRed, fontSize: 12 }}>{v}</span> },
            { key: 'reservasi', label: 'No Reservasi', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.blue }}>{v}</span> },
            { key: 'tanggal', label: 'Tanggal' },
            { key: 'gudang', label: 'Gudang' },
            { key: 'project', label: 'Project' },
            { key: 'pemohon', label: 'Pemohon' },
            { key: 'material', label: 'Jml Material', render: v => <span style={{ fontWeight: 700 }}>{v} item</span> },
            { key: 'status', label: 'Status', render: v => <Badge label={v} /> },
          ]}
          rows={filtered}
          onRowAction={(row) => (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              <button onClick={() => { setSelectedRow(row); setDetailOpen(true); }} style={{
                background: COLORS.gray100, border: 'none', borderRadius: 6, padding: '5px 10px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: COLORS.gray700, fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <Icon name="eye" size={12} color={COLORS.gray500} /> Detail
              </button>
              <button onClick={() => setPdfOpen(row)} style={{
                background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 10px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: COLORS.telkomRed, fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <Icon name="file" size={12} color={COLORS.telkomRed} /> PDF
              </button>
            </div>
          )}
        />
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: COLORS.gray400 }}>Menampilkan {filtered.length} dari {allData.length} data</span>
        </div>
      </Card>

      <Modal open={detailOpen} title={`Detail Pemakaian ${selectedRow?.id}`} onClose={() => setDetailOpen(false)}>
        {selectedRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['No Pemakaian', selectedRow.id],
              ['No Reservasi', selectedRow.reservasi],
              ['Tanggal', selectedRow.tanggal],
              ['Gudang', selectedRow.gudang],
              ['Project', selectedRow.project],
              ['Pemohon', selectedRow.pemohon],
              ['Jumlah Material', selectedRow.material + ' item'],
              ['Status', selectedRow.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${COLORS.gray100}` }}>
                <span style={{ fontSize: 12, color: COLORS.gray500, fontWeight: 500 }}>{k}</span>
                {k === 'Status' ? <Badge label={v} /> : <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray800 }}>{v}</span>}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <Btn variant="secondary" onClick={() => setDetailOpen(false)}>Tutup</Btn>
              <Btn variant="primary" icon="file" onClick={() => { setPdfOpen(selectedRow); setDetailOpen(false); }}>Lihat PDF</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* PDF Explorer Modal */}
      {pdfOpen && <PdfExplorer doc={pdfOpen} onClose={() => setPdfOpen(null)} showToast={showToast} />}
    </div>
  );
};

/* ────────────────────────────────────────────
   APPROVAL PEMAKAIAN
──────────────────────────────────────────── */
const ApprovalPemakaian = ({ showToast }) => {
  const [data, setData] = useState([
    { id: 'PMK-006', tanggal: '2026-04-22', gudang: 'GDG-JKT-01', project: 'PRJ-2026-006', pemohon: 'Reza Firmansyah', material: 3, status: 'Pending', reservasi: 'RSV-006' },
    { id: 'PMK-007', tanggal: '2026-04-22', gudang: 'GDG-BDG-02', project: 'PRJ-2026-007', pemohon: 'Nurul Hidayah', material: 6, status: 'Pending', reservasi: 'RSV-007' },
    { id: 'PMK-008', tanggal: '2026-04-23', gudang: 'GDG-SBY-01', project: 'PRJ-2026-008', pemohon: 'Bagas Prasetyo', material: 2, status: 'Pending', reservasi: 'RSV-008' },
  ]);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [pdfOpen, setPdfOpen] = useState(null);

  const approve = (id) => { setData(p => p.filter(r => r.id !== id)); showToast(`${id} telah disetujui`, 'success'); };
  const reject = () => { setData(p => p.filter(r => r.id !== rejectModal)); showToast(`${rejectModal} telah ditolak`, 'error'); setRejectModal(null); setRejectNote(''); };

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Approval Pemakaian" subtitle="Pemakaian Material" />
      {data.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Icon name="checkCircle" size={52} color={COLORS.green} />
            <p style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: COLORS.gray700 }}>Semua bersih!</p>
            <p style={{ marginTop: 6, fontSize: 13, color: COLORS.gray400 }}>Tidak ada pemakaian yang menunggu approval.</p>
          </div>
        </Card>
      ) : (
        <Card title={`${data.length} Pemakaian Menunggu Approval`}>
          <Table
            columns={[
              { key: 'id', label: 'No Pemakaian', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.telkomRed, fontSize: 12 }}>{v}</span> },
              { key: 'reservasi', label: 'No Reservasi', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.blue }}>{v}</span> },
              { key: 'tanggal', label: 'Tanggal' },
              { key: 'gudang', label: 'Gudang' },
              { key: 'project', label: 'Project' },
              { key: 'pemohon', label: 'Pemohon' },
              { key: 'material', label: 'Material', render: v => v + ' item' },
            ]}
            rows={data}
            onRowAction={(row) => (
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <button onClick={() => setPdfOpen(row)} style={{
                  background: COLORS.gray100, border: 'none', borderRadius: 6, padding: '5px 8px',
                  cursor: 'pointer', fontSize: 11, fontWeight: 600, color: COLORS.gray600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Icon name="file" size={12} color={COLORS.gray500} /> PDF
                </button>
                <button onClick={() => approve(row.id)} style={{
                  background: '#D1FAE5', border: 'none', borderRadius: 6, padding: '5px 12px',
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, color: COLORS.green, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Icon name="check" size={12} color={COLORS.green} /> Setuju
                </button>
                <button onClick={() => setRejectModal(row.id)} style={{
                  background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 12px',
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, color: COLORS.telkomRed, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Icon name="x" size={12} color={COLORS.telkomRed} /> Tolak
                </button>
              </div>
            )}
          />
        </Card>
      )}
      <Modal open={!!rejectModal} title="Tolak Pemakaian" onClose={() => setRejectModal(null)}>
        <p style={{ fontSize: 13, color: COLORS.gray600, marginBottom: 16 }}>Berikan alasan penolakan untuk <strong>{rejectModal}</strong>:</p>
        <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Tulis alasan penolakan..."
          style={{ width: '100%', height: 100, padding: '10px 12px', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", resize: 'vertical', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = COLORS.telkomRed} onBlur={e => e.target.style.borderColor = COLORS.gray200}
        />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setRejectModal(null)}>Batal</Btn>
          <Btn variant="danger" icon="x" onClick={reject}>Tolak Pemakaian</Btn>
        </div>
      </Modal>
      {pdfOpen && <PdfExplorer doc={pdfOpen} onClose={() => setPdfOpen(null)} showToast={showToast} />}
    </div>
  );
};

/* ────────────────────────────────────────────
   PDF EXPLORER
──────────────────────────────────────────── */
const PdfExplorer = ({ doc, onClose, showToast }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const totalPages = 3;

  const mockContent = [
    {
      page: 1, title: 'SURAT PEMAKAIAN MATERIAL',
      content: [
        { label: 'No. Dokumen', value: doc?.id || 'PMK-XXX' },
        { label: 'No. Reservasi', value: doc?.reservasi || 'RSV-XXX' },
        { label: 'Tanggal', value: doc?.tanggal || '-' },
        { label: 'Gudang', value: doc?.gudang || '-' },
        { label: 'Project', value: doc?.project || '-' },
        { label: 'Pemohon', value: doc?.pemohon || '-' },
        { label: 'Status', value: doc?.status || '-' },
      ],
    },
    {
      page: 2, title: 'DETAIL MATERIAL',
      table: [
        { no: 1, kode: 'MTR-001', nama: 'Kabel UTP Cat6', qty: 200, satuan: 'Meter' },
        { no: 2, kode: 'MTR-045', nama: 'Patch Panel 24 Port', qty: 5, satuan: 'Unit' },
        { no: 3, kode: 'MTR-089', nama: 'Switch 24 Port', qty: 3, satuan: 'Unit' },
        { no: 4, kode: 'MTR-112', nama: 'Rack Server 42U', qty: 1, satuan: 'Unit' },
      ],
    },
    {
      page: 3, title: 'TANDA TANGAN & PERSETUJUAN',
      signatures: ['Pemohon', 'Kepala Gudang', 'Manager', 'TL Approver'],
    },
  ];

  const page = mockContent[currentPage - 1];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.75)', zIndex: 9000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)',
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 16, width: '92%', maxWidth: 900, height: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)', animation: 'fadeUp 0.25s ease',
      }} onClick={e => e.stopPropagation()}>

        {/* PDF Header Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px', background: COLORS.gray900, borderRadius: '16px 16px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: COLORS.telkomRed, borderRadius: 6, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="file" size={14} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>PDF</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray100 }}>{doc?.id || 'Dokumen'} — Surat Pemakaian Material</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Upload PDF Button */}
            <label style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, color: COLORS.gray200,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="upload" size={13} color={COLORS.gray300} />
              Upload PDF
              <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => {
                const f = e.target.files[0];
                if (f) { setUploadedFile(f); showToast(`PDF "${f.name}" berhasil diupload`, 'success'); }
              }} />
            </label>
            <button onClick={() => showToast('PDF berhasil diunduh', 'success')} style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, color: COLORS.gray200,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="download" size={13} color={COLORS.gray300} /> Unduh
            </button>
            <button onClick={() => showToast('Dicetak', 'info')} style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, color: COLORS.gray200,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="printer" size={13} color={COLORS.gray300} /> Cetak
            </button>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8,
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="x" size={16} color={COLORS.gray200} />
            </button>
          </div>
        </div>

        {/* PDF Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar: Thumbnails */}
          <div style={{ width: 130, background: COLORS.gray800, overflowY: 'auto', padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockContent.map((p, i) => (
              <div key={i} onClick={() => setCurrentPage(i + 1)} style={{
                background: currentPage === i + 1 ? COLORS.telkomRed : COLORS.gray700,
                borderRadius: 8, padding: 8, cursor: 'pointer',
                border: currentPage === i + 1 ? `2px solid ${COLORS.telkomRedLight}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                <div style={{ background: '#fff', borderRadius: 4, padding: '10px 8px', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ height: 6, background: COLORS.gray300, borderRadius: 2, marginBottom: 4 }} />
                  <div style={{ height: 4, background: COLORS.gray200, borderRadius: 2, marginBottom: 3 }} />
                  <div style={{ height: 4, background: COLORS.gray200, borderRadius: 2, marginBottom: 3, width: '70%' }} />
                  <div style={{ height: 4, background: COLORS.gray100, borderRadius: 2, marginBottom: 3 }} />
                  <div style={{ height: 4, background: COLORS.gray100, borderRadius: 2, width: '80%' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: 10, color: currentPage === i + 1 ? '#fff' : COLORS.gray300, marginTop: 6, fontWeight: 600 }}>
                  Hal {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Main Page View */}
          <div style={{ flex: 1, overflowY: 'auto', background: COLORS.gray700, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, gap: 16 }}>
            {uploadedFile ? (
              <div style={{
                background: '#fff', borderRadius: 8, width: `${zoom}%`, maxWidth: 680, minHeight: 500,
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: 40,
              }}>
                <Icon name="file" size={56} color={COLORS.telkomRed} />
                <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: COLORS.gray800 }}>{uploadedFile.name}</div>
                <div style={{ fontSize: 12, color: COLORS.gray400, marginTop: 4 }}>
                  {(uploadedFile.size / 1024).toFixed(1)} KB · PDF
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: COLORS.gray500 }}>Preview PDF memerlukan viewer. Klik Unduh untuk membuka.</div>
                <button onClick={() => showToast('PDF berhasil diunduh', 'success')} style={{
                  marginTop: 16, background: COLORS.telkomRed, border: 'none', borderRadius: 8,
                  padding: '10px 24px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Icon name="download" size={14} color="#fff" /> Unduh File
                </button>
              </div>
            ) : (
              <div style={{
                background: '#fff', borderRadius: 8,
                width: `${Math.min(zoom, 100)}%`, maxWidth: 680,
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)', padding: '48px 52px',
                transform: `scale(${zoom / 100})`, transformOrigin: 'top center',
                transition: 'transform 0.2s',
              }}>
                {/* Header Surat */}
                <div style={{ textAlign: 'center', borderBottom: `3px solid ${COLORS.telkomRed}`, paddingBottom: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 44, height: 44, background: COLORS.telkomRed, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 20 }}>T</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.gray900 }}>PT TELKOM INDONESIA</div>
                      <div style={{ fontSize: 10, color: COLORS.gray500, letterSpacing: 1 }}>SUPPLY CHAIN MANAGEMENT · ALISTA</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.telkomRed, letterSpacing: 0.5, marginTop: 10 }}>{page.title}</div>
                </div>

                {page.content && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {page.content.map(row => (
                      <div key={row.label} style={{
                        display: 'grid', gridTemplateColumns: '160px 16px 1fr',
                        padding: '7px 0', borderBottom: `1px solid ${COLORS.gray100}`,
                        alignItems: 'center',
                      }}>
                        <span style={{ fontSize: 12, color: COLORS.gray500, fontWeight: 500 }}>{row.label}</span>
                        <span style={{ fontSize: 12, color: COLORS.gray400 }}>:</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray800 }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 20, padding: '12px 16px', background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}` }}>
                      <div style={{ fontSize: 11, color: COLORS.gray500, fontWeight: 600, marginBottom: 4 }}>CATATAN</div>
                      <div style={{ fontSize: 12, color: COLORS.gray600, lineHeight: 1.7 }}>
                        Dokumen ini diterbitkan secara digital oleh sistem ALISTA. Validitas dokumen dapat diverifikasi melalui portal resmi TelkomAkses.
                      </div>
                    </div>
                  </div>
                )}

                {page.table && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: COLORS.telkomRed }}>
                          {['No', 'Kode', 'Nama Material', 'Qty', 'Satuan'].map(h => (
                            <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: 0.4 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {page.table.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : COLORS.gray50, borderBottom: `1px solid ${COLORS.gray200}` }}>
                            <td style={{ padding: '9px 12px', color: COLORS.gray500 }}>{row.no}</td>
                            <td style={{ padding: '9px 12px', fontFamily: "'JetBrains Mono', monospace", color: COLORS.telkomRed, fontSize: 11, fontWeight: 700 }}>{row.kode}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray800, fontWeight: 500 }}>{row.nama}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray800, fontWeight: 700 }}>{row.qty}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray600 }}>{row.satuan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8 }}>
                      <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>Total: {page.table.reduce((acc, r) => acc + r.qty, 0)} item material</span>
                    </div>
                  </div>
                )}

                {page.signatures && (
                  <div>
                    <div style={{ fontSize: 12, color: COLORS.gray500, marginBottom: 24 }}>Dokumen ini telah disetujui oleh pihak-pihak berikut:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      {page.signatures.map(sig => (
                        <div key={sig} style={{ textAlign: 'center', padding: 16, border: `1px dashed ${COLORS.gray300}`, borderRadius: 8 }}>
                          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 8 }}>
                            <div style={{ width: '80%', borderBottom: `2px solid ${COLORS.gray400}` }} />
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray700 }}>{sig}</div>
                          <div style={{ fontSize: 10, color: COLORS.gray400, marginTop: 2 }}>Tanda Tangan & Cap</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 24, textAlign: 'center', fontSize: 10, color: COLORS.gray400, borderTop: `1px solid ${COLORS.gray100}`, paddingTop: 16 }}>
                      © 2026 PT Telkom Indonesia · ALISTA v2.4.0 · Dokumen ini sah secara digital
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PDF Footer: Page Nav + Zoom */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px', background: COLORS.gray800, borderRadius: '0 0 16px 16px',
          borderTop: `1px solid ${COLORS.gray700}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.4 : 1,
            }}>
              <Icon name="chevronRight" size={14} color={COLORS.gray200} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <span style={{ fontSize: 12, color: COLORS.gray300, fontWeight: 500 }}>Halaman {currentPage} dari {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.4 : 1,
            }}>
              <Icon name="chevronRight" size={14} color={COLORS.gray200} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: COLORS.gray200, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontSize: 12, color: COLORS.gray300, minWidth: 44, textAlign: 'center', fontWeight: 600 }}>{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(150, z + 10))} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: COLORS.gray200, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            <button onClick={() => setZoom(100)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '0 10px', height: 28, cursor: 'pointer', color: COLORS.gray400, fontSize: 11, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   MONITORING PAGE
──────────────────────────────────────────── */
const MonitoringPage = ({ showToast }) => {
  const [pdfOpen, setPdfOpen] = useState(null);
  const [filterGudang, setFilterGudang] = useState('Semua');

  const materials = [
    { id: 'MTR-001', nama: 'Kabel UTP Cat6', gudang: 'GDG-JKT-01', stok: 1500, pakai: 320, satuan: 'Meter', status: 'Aman' },
    { id: 'MTR-002', nama: 'Patch Panel 24 Port', gudang: 'GDG-JKT-01', stok: 45, pakai: 38, satuan: 'Unit', status: 'Kritis' },
    { id: 'MTR-003', nama: 'Switch Managed 24P', gudang: 'GDG-BDG-02', stok: 120, pakai: 20, satuan: 'Unit', status: 'Aman' },
    { id: 'MTR-004', nama: 'Server Rack 42U', gudang: 'GDG-SBY-01', stok: 18, pakai: 15, satuan: 'Unit', status: 'Waspada' },
    { id: 'MTR-005', nama: 'Fiber Optik SM', gudang: 'GDG-MKS-01', stok: 5000, pakai: 800, satuan: 'Meter', status: 'Aman' },
    { id: 'MTR-006', nama: 'UPS 1500VA', gudang: 'GDG-BDG-02', stok: 30, pakai: 29, satuan: 'Unit', status: 'Kritis' },
  ];

  const gudangList = ['Semua', 'GDG-JKT-01', 'GDG-BDG-02', 'GDG-SBY-01', 'GDG-MKS-01'];
  const filtered = materials.filter(m => filterGudang === 'Semua' || m.gudang === filterGudang);

  const statusColor = { Aman: COLORS.green, Waspada: COLORS.yellow, Kritis: COLORS.telkomRed };
  const statusBg = { Aman: '#D1FAE5', Waspada: '#FEF3C7', Kritis: '#FEE2E2' };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
  const vals = [450, 620, 580, 790, 710, 920];
  const maxV = Math.max(...vals);

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Monitoring Material" subtitle="Laporan"
        actions={
          <>
            <Btn variant="secondary" size="sm" icon="download" onClick={() => showToast('Laporan monitoring diunduh', 'success')}>Export</Btn>
            <Btn variant="primary" size="sm" icon="file" onClick={() => setPdfOpen({ id: 'RPT-MON', reservasi: '-', tanggal: new Date().toISOString().slice(0, 10), gudang: filterGudang, project: '-', pemohon: '-', status: 'Aktif' })}>
              Lihat PDF
            </Btn>
          </>
        }
      />

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Total Material" value="1.2K" icon="package" color={COLORS.blue} sub="Di 5 gudang" />
        <StatCard label="Status Aman" value="4" icon="checkCircle" color={COLORS.green} sub="66.7%" />
        <StatCard label="Status Waspada" value="1" icon="info" color={COLORS.yellow} sub="16.7%" />
        <StatCard label="Status Kritis" value="2" icon="refresh" color={COLORS.telkomRed} sub="Perlu restock" />
      </div>

      {/* Chart + Filter */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card title="Tren Pemakaian Material (6 Bulan)">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, paddingBottom: 8 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600 }}>{vals[i]}</span>
                <div style={{ width: '100%', background: i === months.length - 1 ? COLORS.blue : COLORS.gray200, borderRadius: '6px 6px 0 0', height: (vals[i] / maxV) * 120 }} />
                <span style={{ fontSize: 11, color: COLORS.gray400 }}>{m}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Distribusi Gudang">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'GDG-JKT-01', val: 40, color: COLORS.telkomRed },
              { label: 'GDG-BDG-02', val: 25, color: COLORS.blue },
              { label: 'GDG-SBY-01', val: 20, color: COLORS.green },
              { label: 'GDG-MKS-01', val: 15, color: COLORS.yellow },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: COLORS.gray600 }}>{s.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.val}%</span>
                </div>
                <div style={{ height: 7, background: COLORS.gray100, borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: s.val + '%', background: s.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Material Table */}
      <Card title="Status Stok Material"
        actions={
          <div style={{ display: 'flex', gap: 6 }}>
            {gudangList.map(g => (
              <button key={g} onClick={() => setFilterGudang(g)} style={{
                padding: '5px 12px', borderRadius: 7, border: `1.5px solid ${filterGudang === g ? COLORS.telkomRed : COLORS.gray200}`,
                background: filterGudang === g ? COLORS.telkomRed : COLORS.white,
                color: filterGudang === g ? '#fff' : COLORS.gray600,
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{g}</button>
            ))}
          </div>
        }
      >
        <Table
          columns={[
            { key: 'id', label: 'Kode', render: v => <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.telkomRed, fontSize: 11 }}>{v}</span> },
            { key: 'nama', label: 'Nama Material' },
            { key: 'gudang', label: 'Gudang', render: v => <span style={{ background: COLORS.gray100, padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{v}</span> },
            { key: 'stok', label: 'Stok', render: (v, row) => <span style={{ fontWeight: 700, color: COLORS.gray800 }}>{v} {row.satuan}</span> },
            { key: 'pakai', label: 'Terpakai', render: (v, row) => <span style={{ color: COLORS.gray500 }}>{v} {row.satuan}</span> },
            {
              key: 'stok', label: 'Utilitas',
              render: (v, row) => {
                const pct = Math.round((row.pakai / row.stok) * 100);
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 80, height: 6, background: COLORS.gray100, borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: pct + '%', height: '100%', background: pct > 80 ? COLORS.telkomRed : pct > 60 ? COLORS.yellow : COLORS.green, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600 }}>{pct}%</span>
                  </div>
                );
              }
            },
            {
              key: 'status', label: 'Status',
              render: v => <span style={{ background: statusBg[v], color: statusColor[v], padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{v}</span>
            },
          ]}
          rows={filtered}
          onRowAction={row => (
            <button onClick={() => setPdfOpen({ id: `RPT-${row.id}`, reservasi: '-', tanggal: new Date().toISOString().slice(0, 10), gudang: row.gudang, project: '-', pemohon: '-', status: row.status })} style={{
              background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 10px',
              cursor: 'pointer', fontSize: 11, fontWeight: 600, color: COLORS.telkomRed,
              fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Icon name="file" size={12} color={COLORS.telkomRed} /> PDF
            </button>
          )}
        />
      </Card>

      {pdfOpen && <PdfExplorer doc={pdfOpen} onClose={() => setPdfOpen(null)} showToast={showToast} />}
    </div>
  );
};

/* ────────────────────────────────────────────
   ALISTA PORTAL
──────────────────────────────────────────── */
const AlistaPortal = ({ onLogout, username }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <HomePage username={username} setActiveTab={setActiveTab} />;
      case 'Buat Reservasi': return <BuatReservasi showToast={showToast} />;
      case 'List Reservasi': return <ListReservasi showToast={showToast} />;
      case 'Approval Resv': return <ApprovalPage title="Approval Reservasi" showToast={showToast} />;
      case 'Approval Resv TL': return <ApprovalPage title="Approval Reservasi TL" showToast={showToast} />;
      case 'Buat Pemakaian': return <BuatPemakaian showToast={showToast} />;
      case 'List Pemakaian': return <ListPemakaian showToast={showToast} />;
      case 'Approval Pemakaian': return <ApprovalPemakaian showToast={showToast} />;
      case 'Dashboard': return <DashboardPage />;
      case 'Monitoring': return <MonitoringPage showToast={showToast} />;
      default: return (
        <div style={{ padding: 28 }}>
          <PageHeader title={activeTab} subtitle="—" />
          <div style={{ marginTop: 24 }}>
            <Card>
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <Icon name="settings" size={48} color={COLORS.gray300} />
                <p style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: COLORS.gray600 }}>Halaman <strong>{activeTab}</strong></p>
                <p style={{ marginTop: 6, fontSize: 12, color: COLORS.gray400 }}>Fitur ini sedang dalam pengembangan.</p>
              </div>
            </Card>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <TopNavbar onLogout={onLogout} username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} open={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', background: COLORS.gray50 }}>
          {renderContent()}
        </main>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

/* ────────────────────────────────────────────
   LOGIN SCREEN
──────────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'yoga' && password === '12345') {
      setLoading(true);
      setTimeout(() => onLogin(username), 900);
    } else {
      setError('Username atau password tidak valid.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, background: `linear-gradient(160deg, ${COLORS.telkomRedDark} 0%, ${COLORS.telkomRed} 50%, #FF3333 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', maxWidth: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <div style={{
              width: 52, height: 52, background: COLORS.white, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 26, color: COLORS.telkomRed,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>T</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>TelkomAkses</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>by PT Telkom Indonesia</div>
            </div>
          </div>

          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: -1, marginBottom: 16 }}>
            Kelola Material<br />
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Lebih Cerdas.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>
            Platform Supply Chain terintegrasi untuk reservasi, monitoring, dan pengelolaan material Telkom Indonesia.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: 'checkCircle', text: 'Reservasi Material Online Real-Time' },
              { icon: 'checkCircle', text: 'Approval Multi-Level Terstruktur' },
              { icon: 'checkCircle', text: 'Dashboard & Laporan Komprehensif' },
              { icon: 'checkCircle', text: 'Integrasi 5+ Gudang Nasional' },
            ].map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name={f.icon} size={16} color="rgba(255,255,255,0.9)" />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: 480, background: COLORS.white, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 48, flexShrink: 0,
      }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.gray400, textTransform: 'uppercase', marginBottom: 10 }}>
              ALISTA · Supply Chain Management
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: COLORS.gray900, letterSpacing: -0.5 }}>Masuk ke Akun</h3>
            <p style={{ fontSize: 13, color: COLORS.gray400, marginTop: 6 }}>Gunakan kredensial Telkom Anda</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: COLORS.gray700, marginBottom: 8, letterSpacing: 0.3 }}>USERNAME</label>
              <div style={{ position: 'relative' }}>
                <Icon name="user" size={15} color={COLORS.gray400} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
                  placeholder="Masukkan username"
                  style={{
                    width: '100%', padding: '12px 14px 12px 40px',
                    border: `2px solid ${error ? COLORS.telkomRed : COLORS.gray200}`, borderRadius: 10,
                    fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.gray800,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
                  onBlur={e => e.target.style.borderColor = error ? COLORS.telkomRed : COLORS.gray200}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: COLORS.gray700, marginBottom: 8, letterSpacing: 0.3 }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Icon name="settings" size={15} color={COLORS.gray400} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Masukkan password"
                  style={{
                    width: '100%', padding: '12px 44px 12px 40px',
                    border: `2px solid ${error ? COLORS.telkomRed : COLORS.gray200}`, borderRadius: 10,
                    fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.gray800,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
                  onBlur={e => e.target.style.borderColor = error ? COLORS.telkomRed : COLORS.gray200}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                  <Icon name="eye" size={15} color={showPass ? COLORS.telkomRed : COLORS.gray400} />
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8,
                padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Icon name="info" size={14} color={COLORS.telkomRed} />
                <span style={{ fontSize: 12, color: COLORS.telkomRed, fontWeight: 500 }}>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: loading ? COLORS.gray300 : COLORS.telkomRed,
              color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: loading ? 'none' : '0 4px 16px rgba(204,0,0,0.3)',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Memverifikasi...
                </>
              ) : 'Masuk ke ALISTA →'}
            </button>
          </form>

          <div style={{
            marginTop: 28, padding: '14px 16px', background: COLORS.gray50, borderRadius: 10,
            border: `1px dashed ${COLORS.gray200}`, textAlign: 'center',
          }}>
            <span style={{ fontSize: 11, color: COLORS.gray400, fontWeight: 500 }}>Demo akun: </span>
            <code style={{ fontSize: 12, color: COLORS.telkomRed, fontWeight: 700, background: COLORS.telkomRedMuted, padding: '2px 6px', borderRadius: 4 }}>yoga</code>
            <span style={{ fontSize: 11, color: COLORS.gray400 }}> / </span>
            <code style={{ fontSize: 12, color: COLORS.telkomRed, fontWeight: 700, background: COLORS.telkomRedMuted, padding: '2px 6px', borderRadius: 4 }}>12345</code>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <span style={{ fontSize: 11, color: COLORS.gray300 }}>© 2026 PT Telkom Indonesia · ALISTA v2.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   ROOT APP
──────────────────────────────────────────── */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  injectStyle(globalStyle);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={(u) => { setUsername(u); setIsAuthenticated(true); }} />;
  }

  return <AlistaPortal onLogout={() => setIsAuthenticated(false)} username={username} />;
}
