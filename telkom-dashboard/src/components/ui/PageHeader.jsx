import React from 'react';
import { COLORS } from '../../constants';

export const PageHeader = ({ title, subtitle, actions }) => (
  <div style={{
    padding: '20px 28px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }}>
    <div>
      <div style={{
        fontSize: 11,
        color: COLORS.gray400,
        fontWeight: 500,
        marginBottom: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{ color: COLORS.telkomRed }}>ALISTA</span>
        <span>›</span>
        <span>{subtitle}</span>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray900, letterSpacing: -0.5 }}>{title}</h1>
    </div>
    {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
  </div>
);
