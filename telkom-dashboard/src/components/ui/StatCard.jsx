import React from 'react';
import { Icon } from '../../icons';
import { COLORS } from '../../constants';

export const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: COLORS.white,
    borderRadius: 14,
    padding: 20,
    border: `1px solid ${COLORS.gray200}`,
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    animation: 'fadeUp 0.35s ease',
  }}>
    <div style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name={icon} size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.gray900, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 4, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);
