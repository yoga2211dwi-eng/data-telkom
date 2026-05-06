import React from 'react';
import { COLORS } from '../../constants';

export const Card = ({ title, children, padding = 24, actions }) => (
  <div style={{
    background: COLORS.white,
    borderRadius: 14,
    border: `1px solid ${COLORS.gray200}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    animation: 'fadeUp 0.3s ease',
  }}>
    {title && (
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${COLORS.gray100}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.gray800 }}>{title}</span>
        {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
      </div>
    )}
    <div style={{ padding }}>{children}</div>
  </div>
);
