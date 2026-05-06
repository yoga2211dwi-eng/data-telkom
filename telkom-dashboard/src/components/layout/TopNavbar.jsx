import React, { useState } from 'react';
import { COLORS, NAV_TOP_LINKS } from '../../shared/constants.js';
import { Icon } from '../../shared/icons.jsx';

export const TopNavbar = ({ onLogout, username, sidebarOpen, setSidebarOpen }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifData = [
    { id: 1, text: 'RSV-004 telah disetujui oleh TL', time: '5 menit lalu', unread: true },
    { id: 2, text: 'Budget PRJ-2026-005 perlu dicek',  time: '1 jam lalu',  unread: true },
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
      {/* Kiri: Hamburger + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer' }}>
          <Icon name="menu" size={18} color="#fff" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: COLORS.white, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: COLORS.telkomRed, fontSize: 18 }}>T</div>
          <div style={{ color: '#fff' }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>TelkomAkses</div>
            <div style={{ fontSize: 10, opacity: 0.75 }}>ALISTA · Supply Chain</div>
          </div>
        </div>
      </div>

      {/* Tengah: Menu Links */}
      <nav style={{ display: 'flex', gap: 4 }}>
        {NAV_TOP_LINKS.map(link => (
          <button key={link} style={{ background: 'transparent', border: 'none', color: '#fff', padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{link}</button>
        ))}
      </nav>

      {/* Kanan: Notif & User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer' }}>
            <Icon name="bell" size={16} color="#fff" />
            {unreadCount > 0 && <span style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, background: '#FCD34D', borderRadius: '50%', border: '2px solid ' + COLORS.telkomRed }} />}
          </button>
          {notifOpen && (
            <div style={{ position: 'absolute', right: 0, top: 44, width: 320, background: '#fff', borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', border: `1px solid ${COLORS.gray100}` }}>
              <div style={{ padding: 14, borderBottom: `1px solid ${COLORS.gray100}`, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <strong>Notifikasi</strong>
                <span style={{ color: COLORS.telkomRed, cursor: 'pointer' }}>Baca Semua</span>
              </div>
              {notifData.map(n => (
                <div key={n.id} style={{ padding: 12, display: 'flex', gap: 12, background: n.unread ? 'rgba(204,0,0,0.03)' : '#fff', borderBottom: `1px solid ${COLORS.gray50}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.unread ? COLORS.telkomRed : COLORS.gray200, marginTop: 5 }} />
                  <div>
                    <p style={{ fontSize: 12 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: COLORS.gray400 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button onClick={() => setProfileOpen(!profileOpen)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, color: '#fff', cursor: 'pointer' }}>
          <Icon name="user" size={14} color="#fff" />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{username}</span>
        </button>
      </div>
    </header>
  );
};