import React, { useEffect } from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? COLORS.green : type === 'error' ? COLORS.telkomRed : COLORS.blue;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9999,
      background: bg,
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'toastIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      maxWidth: 360,
    }}>
      <Icon name={type === 'success' ? 'check' : type === 'error' ? 'x' : 'info'} size={16} color="#fff" />
      {msg}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 8, padding: 0 }}>
        <Icon name="x" size={14} color="#fff" />
      </button>
    </div>
  );
};
