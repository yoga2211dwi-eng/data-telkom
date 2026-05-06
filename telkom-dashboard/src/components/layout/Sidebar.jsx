import React, { useState } from 'react';
import { COLORS } from '../../shared/constants.js';
import { Icon } from '../../shared/icons.jsx';

const NavItem = ({ icon, label, active, onClick, children, isGroup, open, sidebarOpen }) => (
  <div>
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
      padding: '10px 16px', border: 'none', borderRadius: 10, cursor: 'pointer',
      background: active ? COLORS.telkomRed : 'transparent', color: active ? '#fff' : COLORS.gray600,
      marginBottom: 2, transition: 'all 0.15s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name={icon} size={16} color={active ? '#fff' : COLORS.gray500} />
        {sidebarOpen && <span style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>{label}</span>}
      </div>
      {isGroup && sidebarOpen && <Icon name="chevronDown" size={13} style={{ transform: open ? 'rotate(180deg)' : 'none' }} />}
    </button>
    {children}
  </div>
);

const SubItem = ({ label, active, onClick, sidebarOpen }) => (
  sidebarOpen && (
    <button onClick={onClick} style={{
      display: 'flex', width: '100%', padding: '8px 14px 8px 40px', border: 'none', borderRadius: 8,
      cursor: 'pointer', fontSize: 12, textAlign: 'left', background: active ? 'rgba(204,0,0,0.05)' : 'transparent',
      color: active ? COLORS.telkomRed : COLORS.gray500, borderLeft: active ? `3px solid ${COLORS.telkomRed}` : '3px solid transparent'
    }}>
      {label}
    </button>
  )
);

export const Sidebar = ({ activeTab, setActiveTab, open }) => {
  const [resvOpen, setResvOpen] = useState(true);
  const [pakaiOpen, setPakaiOpen] = useState(false);

  return (
    <aside style={{
      width: open ? 240 : 64, background: '#fff', borderRight: `1px solid ${COLORS.gray200}`,
      height: 'calc(100vh - 60px)', transition: 'width 0.3s', padding: '16px 8px'
    }}>
      <NavItem icon="home" label="Home" active={activeTab === 'Home'} sidebarOpen={open} onClick={() => setActiveTab('Home')} />
      
      {open && <div style={{ fontSize: 10, color: COLORS.gray300, padding: '12px 8px 6px' }}>MATERIAL</div>}
      
      <NavItem icon="file" label="Resv Material" isGroup open={resvOpen} sidebarOpen={open} onClick={() => setResvOpen(!resvOpen)}>
        {resvOpen && open && (
          <div>
            <SubItem label="Buat Reservasi" active={activeTab === 'Buat Reservasi'} onClick={() => setActiveTab('Buat Reservasi')} sidebarOpen={open} />
            <SubItem label="List Reservasi" active={activeTab === 'List Reservasi'} onClick={() => setActiveTab('List Reservasi')} sidebarOpen={open} />
            <SubItem label="Approval Reservasi" active={activeTab === 'Approval Reservasi'} onClick={() => setActiveTab('Approval Reservasi')} sidebarOpen={open} />
          </div>
        )}
      </NavItem>
    </aside>
  );
};