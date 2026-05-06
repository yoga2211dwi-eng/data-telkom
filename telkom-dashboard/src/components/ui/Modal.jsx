import React from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,0.6)',
      zIndex: 8888,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white,
        borderRadius: 16,
        padding: 32,
        maxWidth: 520,
        width: '90%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        animation: 'fadeUp 0.25s ease',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.gray800 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: COLORS.gray100,
            border: 'none',
            borderRadius: 8,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Icon name="x" size={16} color={COLORS.gray600} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
