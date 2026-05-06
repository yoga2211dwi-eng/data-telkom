import React from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const Input = ({ label, placeholder, type = 'text', value, onChange, required, note, icon, style: extStyle }) => (
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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: icon ? '9px 12px 9px 34px' : '9px 12px',
          border: `1.5px solid ${COLORS.gray200}`,
          borderRadius: 8,
          fontSize: 13,
          color: COLORS.gray800,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          outline: 'none',
          transition: 'border-color 0.15s',
          background: COLORS.white,
          ...(extStyle || {}),
        }}
        onFocus={(e) => (e.target.style.borderColor = COLORS.telkomRed)}
        onBlur={(e) => (e.target.style.borderColor = COLORS.gray200)}
      />
    </div>
  </div>
);
