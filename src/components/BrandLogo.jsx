export default function BrandLogo({ size = 32, variant = 'full', className = '' }) {
  // variant: 'icon' | 'full' | 'app'
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center rounded-[${Math.round(size*0.25)}px] bg-black ${className}`} style={{ width: size, height: size }}>
        <svg width={size*0.7} height={size*0.7} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 C4 4 16 4 20 8 C24 12 24 20 20 24 C16 28 4 28 4 28 V4Z" stroke="white" strokeWidth="2.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M10 11 C10 11 15 11 16.5 12.5 C18 14 18 17 16.5 18.5 C15 20 10 20 10 20 C10 20 10 20 10 24 L10 11Z" stroke="white" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M18.5 19.5 C20 18 22 17 24 15.5 L26.5 18 L24 20.5 L26.5 23 L24 25.5 C22 24 20 23 18.5 21.5" fill="#007AFF" />
          <path d="M19 19 Q22 16 25 14" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
    );
  }

  if (variant === 'app') {
    return (
      <div className={`inline-flex items-center justify-center bg-black rounded-[${Math.round(size*0.22)}px] ${className}`} style={{ width: size, height: size, borderRadius: size*0.22 }}>
        <svg width={size*0.65} height={size*0.65} viewBox="0 0 100 100" fill="none">
          <path d="M18 18 H52 C72 18 84 30 84 50 C84 70 72 82 52 82 H18 V18Z" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M38 38 H52 C60 38 64 42 64 50 C64 58 60 62 52 62 H38 V76 L38 38Z" stroke="white" strokeWidth="6.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="50" cy="52" r="6" fill="white" opacity="0"/>
          <path d="M68 58 Q78 50 88 42 L96 50 L88 58 L96 66 L88 74 Q78 66 68 58Z" fill="#007AFF"/>
        </svg>
      </div>
    );
  }

  // full with wordmark
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 bg-black rounded-[10px] grid place-items-center shrink-0">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path d="M5 5 H18 C23 5 27 9 27 15 C27 21 23 26 18 26 H5 V5Z" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 11 H17 C19 11 20.5 12.5 20.5 15 C20.5 17.5 19 19 17 19 H11 V24" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 18 Q24 16 27 13 L29 15 L27 17 L29 19 L27 21 Q24 19 21 18Z" fill="#007AFF"/>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[17px] font-[800] tracking-[-0.02em] text-black">DanskPath</span>
        <span className="text-[10px] font-[600] tracking-[0.08em] uppercase text-black/50 -mt-[1px]">Modul 1 → PD3</span>
      </div>
    </div>
  );
}

export function LogoIcon({ size = 32, className='' }) {
  return <BrandLogo size={size} variant="icon" className={className} />;
}
export function AppIcon({ size = 60, className='' }) {
  return <BrandLogo size={size} variant="app" className={className} />;
}
