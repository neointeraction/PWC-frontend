export const lightTheme = {
  name: 'light' as const,
  colors: {
    primary: '#5D2384',
    primaryHover: '#4A1B6B',
    primaryLight: '#F4ECF8',
    primaryMuted: '#D6BBE8',

    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceHover: '#F1F5F9',

    border: '#E2E8F0',
    borderFocus: '#5D2384',

    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    success: '#16A34A',
    successLight: '#DCFCE7',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    danger: '#DC2626',
    dangerLight: '#FEE2E2',
    info: '#0891B2',
    infoLight: '#CFFAFE',

    sidebar: '#FFFFFF',
    sidebarBorder: '#E2E8F0',
    sidebarText: '#374151',
    sidebarTextActive: '#5D2384',
    sidebarBgActive: '#F4ECF8',

    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '4px',
    lg: '4px',
    xl: '4px',
    full: '4px',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
    xxxl: '24px',
    display: '30px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },
  zIndex: {
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
};

export const darkTheme = {
  ...lightTheme,
  name: 'dark' as const,
  colors: {
    primary: '#8A41C1',
    primaryHover: '#7534A7',
    primaryLight: '#35164B',
    primaryMuted: '#5D2384',

    background: '#0F172A',
    surface: '#1E293B',
    surfaceHover: '#334155',

    border: '#334155',
    borderFocus: '#8A41C1',

    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0F172A',

    success: '#22C55E',
    successLight: '#14532D',
    warning: '#F59E0B',
    warningLight: '#451A03',
    danger: '#EF4444',
    dangerLight: '#450A0A',
    info: '#22D3EE',
    infoLight: '#083344',

    sidebar: '#1E293B',
    sidebarBorder: '#334155',
    sidebarText: '#94A3B8',
    sidebarTextActive: '#8A41C1',
    sidebarBgActive: '#35164B',

    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  },
};

export type AppTheme = typeof lightTheme;
export type ThemeName = 'light' | 'dark';
