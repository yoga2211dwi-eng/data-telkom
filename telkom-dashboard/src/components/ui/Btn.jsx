import React, { useState } from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, icon, type = 'button' }) => {
  const [hovered, setHovered] = useState(false);
  const styles = {
    primary: {
      bg: hovered ? COLORS.telkomRedDark : COLORS.telkomRed,
      color: '#fff',
      border: 'none',
    },
    secondary: {
      bg: hovered ? COLORS.gray100 : COLORS.white,
      color: COLORS.gray700,
      border: `1px solid ${COLORS.gray200}`,
    },
    ghost: {
      bg: hovered ? COLORS.gray100 : 'transparent',
      color: COLORS.gray600,
      border: 'none',
    },
    danger: {
      bg: hovered ? '#990000' : COLORS.telkomRed,
      color: '#fff',
      border: 'none',
    },
    success: {
      bg: hovered ? '#059669' : COLORS.green,
      color: '#fff',
      border: 'none',
    },
  };

  const s = styles[variant] || styles.primary;
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 28px' : '9px 18px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled ? COLORS.gray200 : s.bg,
        color: disabled ? COLORS.gray400 : s.color,
        border: s.border || 'none',
        borderRadius: 8,
        padding: pad,
        fontSize: fs,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all 0.15s',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        whiteSpace: 'nowrap',
        boxShadow: variant === 'primary' && !disabled ? '0 2px 8px rgba(204,0,0,0.25)' : 'none',
      }}
    >
      {icon && <Icon name={icon} size={fs + 2} color={disabled ? COLORS.gray400 : s.color} />}
      {children}
    </button>
  );
};
