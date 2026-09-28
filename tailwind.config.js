/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFBF5",
        paper: "#FFF8F0",
        sage: {
          DEFAULT: "#8AA99E",
          dark: "#6B8A7F",
          light: "#E3EDEA",
          50: "#F2F6F5",
          100: "#E3EDEA",
          200: "#C5D8D1",
          300: "#A8C4BA",
          400: "#8AA99E",
          500: "#6B8A7F",
          600: "#556F65",
          700: "#3F534C",
        },
        terracotta: {
          DEFAULT: "#D88C7A",
          light: "#FBE8E2",
          dark: "#B86E5A",
        },
        sky: {
          DEFAULT: "#8BBEE8",
          light: "#E3EEFF",
          dark: "#5A9BD4",
        },
        charcoal: "#121417",
        ink: "#2B2D33",
        line: "#E8E0D6",
        beige: "#F2E8CF",
      },
      fontFamily: {
        sans: ['Inter','SF Pro Text','-apple-system','system-ui','sans-serif'],
        display: ['Outfit','SF Pro Display','Inter','sans-serif'],
        mono: ['JetBrains Mono','SF Mono','monospace'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 16px rgba(18,20,23,0.06)',
        'md': '0 8px 32px rgba(18,20,23,0.08)',
        'lg': '0 16px 48px rgba(18,20,23,0.10)',
        'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.04)',
      },
      animation: {
        'draw': 'draw 1.5s ease-out forwards',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulseSlow 2s infinite',
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
