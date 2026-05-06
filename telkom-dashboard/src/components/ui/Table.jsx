import React from 'react';
import { COLORS } from '../../constants';

export const Table = ({ columns, rows, onRowAction }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: COLORS.gray50 }}>
          {columns.map((col) => (
            <th key={col.key} style={{
              padding: '10px 14px',
              textAlign: 'left',
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.gray500,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              borderBottom: `2px solid ${COLORS.gray200}`,
              whiteSpace: 'nowrap',
            }}>
              {col.label}
            </th>
          ))}
          {onRowAction && (
            <th style={{
              padding: '10px 14px',
              borderBottom: `2px solid ${COLORS.gray200}`,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.gray500,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              AKSI
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${COLORS.gray100}`, transition: 'background 0.1s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.gray50)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {columns.map((col) => (
              <td key={col.key} style={{ padding: '12px 14px', color: COLORS.gray700, verticalAlign: 'middle' }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {onRowAction && (
              <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                {onRowAction(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
