// icons.jsx — React stroke icons per Action Plan Phase 4
// One stroke icon family, no emoji, one weight 1.5

export function HomeIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 8L10 2L17 8V17C17 17.5 16.5 18 16 18H4C3.5 18 3 17.5 3 17V8Z"/><path d="M8 18V11H12V18"/></svg>; }
export function PathIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 2C10 2 14 6 14 10C14 14 10 18 10 18C10 18 6 14 6 10C6 6 10 2 10 2Z"/><circle cx="10" cy="10" r="2"/></svg>; }
export function PracticeIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2L2 12L7 13L8 18L18 8L13 7L12 2Z"/></svg>; }
export function ProgressIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 16V8"/><path d="M8 16V4"/><path d="M13 16V10"/><path d="M18 16V6"/></svg>; }
export function CheckIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 10L8 14L16 6"/></svg>; }
export function NextIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 4L13 10L7 16"/></svg>; }
export function BackIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 4L7 10L13 16"/></svg>; }
export function CloseIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 5L15 15"/><path d="M15 5L5 15"/></svg>; }
export function BookIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 4C3 3.5 3.5 3 4 3H10V17H4C3.5 17 3 16.5 3 16V4Z"/><path d="M10 3H16C16.5 3 17 3.5 17 4V16C17 16.5 16.5 17 16 17H10"/></svg>; }
export function UserIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="10" cy="6" r="3"/><path d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17"/></svg>; }
export function SettingsIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="10" cy="10" r="2.5"/><path d="M10 2V3.5"/><path d="M10 16.5V18"/><path d="M2 10H3.5"/><path d="M16.5 10H18"/><path d="M4.5 4.5L5.5 5.5"/><path d="M14.5 14.5L15.5 15.5"/><path d="M15.5 4.5L14.5 5.5"/><path d="M5.5 14.5L4.5 15.5"/></svg>; }
export function AudioIcon(props) { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 9C6 6.5 8 4 10 4C12 4 14 6.5 14 9V11C14 13.5 12 16 10 16C8 16 6 13.5 6 11V9Z"/><path d="M10 16V18"/><path d="M8 18H12"/></svg>; }

export const Icon = {
  Home: HomeIcon,
  Path: PathIcon,
  Practice: PracticeIcon,
  Progress: ProgressIcon,
  Check: CheckIcon,
  Next: NextIcon,
  Back: BackIcon,
  Close: CloseIcon,
  Book: BookIcon,
  User: UserIcon,
  Settings: SettingsIcon,
  Audio: AudioIcon,
};

export default Icon;
