import React from 'react';
import { BADGE_STATUS } from '../../constants';

export const Badge = ({ label }) => {
  const s = BADGE_STATUS[label] || { bg: '#F1F5F9', text: '#64748B' };
  return (
    <span style={{
      background: s.bg,
      color: s.text,
      padding: '3px 10px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      display: 'inline-block',
    }}>{label}</span>
  );
};
