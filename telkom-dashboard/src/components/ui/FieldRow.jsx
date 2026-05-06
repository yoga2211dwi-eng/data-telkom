import React from 'react';
import { COLORS } from '../../constants';

export const FieldRow = ({ label, required, note, children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: 16,
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottom: `1px solid ${COLORS.gray50}`,
    marginBottom: 14,
  }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray700, paddingTop: 9, lineHeight: 1.4 }}>
      {label}
      {required && <span style={{ color: COLORS.telkomRed, marginLeft: 3 }}>*</span>}
      {note && <div style={{ fontWeight: 400, color: COLORS.gray400, fontSize: 11, marginTop: 2 }}>{note}</div>}
    </label>
    <div>{children}</div>
  </div>
);
