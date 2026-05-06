// constants.js

export const COLORS = {
  telkomRed:      '#CC0000',
  telkomRedDark:  '#990000',
  telkomRedLight: '#FF1A1A',
  telkomRedMuted: '#FFE5E5',
  gray50:  '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  white:  '#FFFFFF',
  green:  '#10B981',
  yellow: '#F59E0B',
  blue:   '#3B82F6',
};

export const BADGE_STATUS = {
  Pending:     { bg: '#FEF3C7', text: '#D97706' },
  Approved:    { bg: '#D1FAE5', text: '#059669' },
  Rejected:    { bg: '#FEE2E2', text: '#DC2626' },
  'In Progress': { bg: '#DBEAFE', text: '#2563EB' },
};

export const NAV_TOP_LINKS = ['HOME', "WHAT'S NEW", 'DIREKTORI', 'TIM', 'KONTAK'];

export const SATUAN_OPTIONS = ['Pcs', 'Unit', 'Meter', 'Rol', 'Box', 'Set', 'Kg'];

export const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: ${COLORS.gray50};
    color: ${COLORS.gray800};
    font-size: 13px;
    line-height: 1.5;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: ${COLORS.gray100}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.gray300}; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: ${COLORS.telkomRed}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
`;