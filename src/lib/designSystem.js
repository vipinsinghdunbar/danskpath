// Design System — iOS modern, consistent across entire product
// Single source of truth for typography, colors, spacing, radius, shadows, animation

export const colors = {
  // Backgrounds
  bg: '#F2F2F7', // iOS systemGroupedBackground
  bgCard: '#FFFFFF',
  bgSecondary: '#F5F5F7',
  bgTertiary: '#EFEFF4',
  
  // Text
  ink: '#000000',
  inkSecondary: '#1C1C1E',
  label: '#000000',
  secondaryLabel: '#3C3C43', // 60% opacity
  tertiaryLabel: '#8E8E93', // iOS secondary
  quaternaryLabel: '#AEAEB2',
  
  // Separators
  separator: 'rgba(0,0,0,0.06)',
  separatorStrong: 'rgba(0,0,0,0.1)',
  
  // Accent — restrained blue/indigo family
  accent: '#007AFF', // iOS blue — primary
  accentSoft: '#E5F1FF',
  accent2: '#5856D6', // indigo — secondary
  accent3: '#AF52DE', // purple
  
  // Semantic
  success: '#34C759',
  successSoft: '#E8F8EB',
  warning: '#FF9500',
  warningSoft: '#FFF4E5',
  error: '#FF3B30',
  errorSoft: '#FFE5E3',
  
  // Module colors — subtle, not bright
  m1: '#007AFF',
  m2: '#5856D6',
  m3: '#AF52DE',
  m4: '#FF2D55',
  m5: '#000000',
  pd3: '#000000',
};

export const typography = {
  largeTitle: { fontSize: '34px', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' },
  title1: { fontSize: '28px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' },
  title2: { fontSize: '22px', lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' },
  title3: { fontSize: '20px', lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' },
  headline: { fontSize: '17px', lineHeight: '1.35', fontWeight: '600', letterSpacing: '-0.02em' },
  body: { fontSize: '17px', lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.02em' },
  callout: { fontSize: '16px', lineHeight: '1.4', fontWeight: '400' },
  subheadline: { fontSize: '15px', lineHeight: '1.4', fontWeight: '400' },
  footnote: { fontSize: '13px', lineHeight: '1.4', fontWeight: '400' },
  caption1: { fontSize: '12px', lineHeight: '1.35', fontWeight: '400' },
  caption2: { fontSize: '11px', lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.02em' },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

export const radius = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
};

export const shadow = {
  sm: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 16px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
  lg: '0 12px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
};

export const animation = {
  spring: 'cubic-bezier(0.16,1,0.3,1)', // iOS spring
  easeOut: 'cubic-bezier(0.25,0.1,0.25,1)',
  duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
};

// Component variants — consistent across product
export const buttonVariants = {
  primary: 'bg-black text-white rounded-full px-6 py-3.5 text-[17px] font-[600] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all',
  secondary: 'bg-white border border-black/10 rounded-full px-6 py-3.5 text-[15px] font-[600] hover:bg-[#F2F2F7] active:scale-[0.97] transition-all',
  accent: 'bg-[#007AFF] text-white rounded-full px-6 py-3.5 text-[17px] font-[600] shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] hover:-translate-y-0.5 active:scale-[0.97] transition-all',
  ghost: 'bg-[#F2F2F7] rounded-full px-5 py-3 text-[14px] font-[600] hover:bg-black/5 active:scale-[0.97] transition-all',
};

export const cardVariants = {
  default: 'bg-white rounded-[24px] p-6 shadow-sm border border-black/5',
  large: 'bg-white rounded-[32px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/[0.04]',
  secondary: 'bg-[#F2F2F7] rounded-[20px] p-5',
  accent: 'bg-black text-white rounded-[24px] p-6',
};

// Feedback states
export const feedbackStates = {
  idle: 'bg-[#F2F2F7] border-transparent',
  correct: 'bg-[#34C759]/10 border-[#34C759]/20 text-[#34C759]',
  incorrect: 'bg-[#FF3B30]/10 border-[#FF3B30]/20 text-[#FF3B30]',
  info: 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF]',
  warning: 'bg-[#FF9500]/10 border-[#FF9500]/20 text-[#FF9500]',
};

// Progress indicators
export const progressVariants = {
  bar: 'h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden',
  barFill: 'h-full rounded-full transition-all duration-1000',
  ring: 'rounded-full border-[3px]',
};

// Audit — current UI issues
export const uiAudit = {
  issues: [
    { area: "Typography inconsistency", issue: "Landing uses Fraunces serif, internal uses Inter, some use IBM Mono. No consistent scale.", fix: "Use SF Pro Display / Inter only, with defined scale: largeTitle 34, title1 28, body 17, footnote 13. Implemented in designSystem." },
    { area: "Color chaos", issue: "Multiple accent colors: #2A4F9E, #0B3D2E, #121417, #EEF2FB, #FFFCF7. No semantic meaning.", fix: "Restrained palette: #007AFF primary, #5856D6 secondary, #F2F2F7 background, semantic success/warning/error. Color communicates meaning: completed=black, current=blue, attention=orange, error=red." },
    { area: "Border radius inconsistency", issue: "Some cards 14px, some 0, some full. Buttons 999px vs 12px. No system.", fix: "System: sm 12, md 16, lg 20, xl 24, 2xl 32, full 9999. Cards 24-32, buttons full, list rows 16." },
    { area: "Shadow inconsistency", issue: "Some 6px hard shadow, some none, some 0 2px 12px. No elevation system.", fix: "Elevation: sm (cards), md (hover), lg (modals/tab bar). Soft, not hard." },
    { area: "Navigation fragmentation", issue: "Sidebar brutalist, BottomNav separate, MoreSheet different style, Flow diagram enterprise.", fix: "One navigation: sidebar iOS style (white rounded list), bottom tab bar floating pill with blur, MoreSheet bottom sheet rounded 32." },
    { area: "Interaction feedback missing", issue: "Buttons no feedback, no haptic, no loading states, no empty states.", fix: "Every tap: scale 0.97 + vibrate 10ms + shadow change. Loading: spinner. Empty: illustration + CTA. Error: red soft background." },
    { area: "Spacing randomness", issue: "mt-3, mt-4, mt-6, mt-8, p-3, p-4, p-5, p-6, p-8 — no 4/8 grid.", fix: "4px base grid: xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48. Consistent across product." },
    { area: "Enterprise dashboard feel", issue: "Tables, grids with 1px black lines, uppercase tracking 0.2em everywhere, feels like admin tool.", fix: "Calm, premium: generous spacing, soft backgrounds, no black grid lines, uppercase only for section labels 11px 700." },
  ]
};
