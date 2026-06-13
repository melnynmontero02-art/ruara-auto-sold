import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ruara: {
          black: '#03040A',
          surface: '#0A0B16',
          card: '#0F1025',
          blue: '#3B82F6',
          'blue-dark': '#1D4ED8',
          border: 'rgba(255,255,255,0.07)',
        },
      },
      fontFamily: {
        syncopate: ['var(--font-syncopate)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scroll-left': 'scrollLeft 40s linear infinite',
        'chevron-bounce': 'chevronBounce 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        chevronBounce: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(8px)' },
        },
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(148,163,184,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.12)',
        'card-hover': '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(148,163,184,0.25)',
        'inset-border': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
