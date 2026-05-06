import React from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const SearchInput = ({ placeholder, style: ext }) => (
  <div style={{ position: 'relative', ...(ext || {}) }}>
    <Icon name="search" size={14} color={COLORS.gray400} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    <input
      placeholder={placeholder || 'Cari...'}
      style={{
        width: '100%',
        padding: '9px 12px 9px 34px',
        border: `1.5px solid ${COLORS.gray200}`,
        borderRadius: 8,
        fontSize: 13,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        outline: 'none',
        color: COLORS.gray800,
        background: COLORS.white,
        transition: 'border-color 0.15s',
      }}
      onFocus={(e) => (e.target.style.borderColor = COLORS.telkomRed)}
      onBlur={(e) => (e.target.style.borderColor = COLORS.gray200)}
    />
  </div>
);
