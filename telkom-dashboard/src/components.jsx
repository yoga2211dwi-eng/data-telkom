// components.jsx
import React, { useState, useEffect } from 'react';
import { COLORS, BADGE_STATUS } from './constants.js';
import { Icon } from './icons.jsx';

export const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  const bg = type === 'success' ? COLORS.green : type === 'error' ? COLORS.telkomRed : COLORS.blue;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: bg, color: '#fff', padding: '12px 20px', borderRadius: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center',
      gap: 10, animation: 'toastIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275)',
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

export const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 8888,
      display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 16, padding: 32, maxWidth: 520, width: '90%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)', animation: 'fadeUp 0.25s ease',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: COLORS.gray800 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: COLORS.gray100, border: 'none', borderRadius: 8, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="x" size={16} color={COLORS.gray600} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const Card = ({ title, children, padding = 24, actions }) => (
  <div style={{
    background: COLORS.white, borderRadius: 14, border: `1px solid ${COLORS.gray200}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', animation: 'fadeUp 0.3s ease',
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

export const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: COLORS.white, borderRadius: 14, padding: 20, border: `1px solid ${COLORS.gray200}`,
    display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    animation: 'fadeUp 0.35s ease',
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
      {sub && <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

export const Badge = ({ label }) => {
  const s = BADGE_STATUS[label] || { bg: COLORS.gray100, text: COLORS.gray600 };
  return (
    <span style={{
      background: s.bg, color: s.text, padding: '3px 10px',
      borderRadius: 99, fontSize: 11, fontWeight: 600, display: 'inline-block',
    }}>{label}</span>
  );
};

export const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, icon, type = 'button' }) => {
  const [hovered, setHovered] = useState(false);
  const styles = {
    primary:   { bg: hovered ? COLORS.telkomRedDark : COLORS.telkomRed, color: '#fff', border: 'none' },
    secondary: { bg: hovered ? COLORS.gray100 : COLORS.white, color: COLORS.gray700, border: `1px solid ${COLORS.gray200}` },
    ghost:     { bg: hovered ? COLORS.gray100 : 'transparent', color: COLORS.gray600, border: 'none' },
    danger:    { bg: hovered ? '#990000' : COLORS.telkomRed, color: '#fff', border: 'none' },
    success:   { bg: hovered ? '#059669' : COLORS.green, color: '#fff', border: 'none' },
  };
  const s = styles[variant] || styles.primary;
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 28px' : '9px 18px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled ? COLORS.gray200 : s.bg, color: disabled ? COLORS.gray400 : s.color,
        border: s.border || 'none', borderRadius: 8, padding: pad, fontSize: fs, fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center',
        gap: 6, transition: 'all 0.15s', fontFamily: "'Plus Jakarta Sans', sans-serif",
        whiteSpace: 'nowrap', boxShadow: variant === 'primary' && !disabled ? '0 2px 8px rgba(204,0,0,0.25)' : 'none',
      }}
    >
      {icon && <Icon name={icon} size={fs + 2} color={disabled ? COLORS.gray400 : s.color} />}
      {children}
    </button>
  );
};

export const Input = ({ label, placeholder, type = 'text', value, onChange, required, note, icon, style: extStyle }) => (
  <div>
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
          border: `1.5px solid ${COLORS.gray200}`, borderRadius: 8, fontSize: 13,
          color: COLORS.gray800, fontFamily: "'Plus Jakarta Sans', sans-serif",
          outline: 'none', transition: 'border-color 0.15s', background: COLORS.white,
          ...(extStyle || {}),
        }}
        onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
        onBlur={e => e.target.style.borderColor = COLORS.gray200}
      />
    </div>
  </div>
);

export const SearchInput = ({ placeholder, value, onChange, style: ext }) => (
  <div style={{ position: 'relative', ...(ext || {}) }}>
    <Icon name="search" size={14} color={COLORS.gray400}
      style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    <input placeholder={placeholder || 'Cari...'} value={value} onChange={onChange}
      style={{
        width: '100%', padding: '9px 12px 9px 34px', border: `1.5px solid ${COLORS.gray200}`,
        borderRadius: 8, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
        outline: 'none', color: COLORS.gray800, background: COLORS.white, transition: 'border-color 0.15s',
      }}
      onFocus={e => e.target.style.borderColor = COLORS.telkomRed}
      onBlur={e => e.target.style.borderColor = COLORS.gray200}
    />
  </div>
);

export const FieldRow = ({ label, required, note, children }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'flex-start',
    paddingBottom: 14, borderBottom: `1px solid ${COLORS.gray50}`, marginBottom: 14,
  }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray700, paddingTop: 9, lineHeight: 1.4 }}>
      {label}
      {required && <span style={{ color: COLORS.telkomRed, marginLeft: 3 }}>*</span>}
      {note && <div style={{ fontWeight: 400, color: COLORS.gray400, fontSize: 11, marginTop: 2 }}>{note}</div>}
    </label>
    <div>{children}</div>
  </div>
);

export const PageHeader = ({ title, subtitle, actions }) => (
  <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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

export const Table = ({ columns, rows, onRowAction }) => (
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
          {onRowAction && (
            <th style={{
              padding: '10px 14px', borderBottom: `2px solid ${COLORS.gray200}`,
              textAlign: 'center', fontSize: 11, fontWeight: 700, color: COLORS.gray500,
              letterSpacing: 0.5, textTransform: 'uppercase',
            }}>AKSI</th>
          )}
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
              <td style={{ padding: '12px 14px', textAlign: 'center' }}>{onRowAction(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);