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
          gold: '#C9A352',
          'gold-light': '#F5DFA0',
          'gold-dark': '#8B6A20',
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
        'pulse-gold': 'pulseGold 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gold-delay': 'pulseGold 2.5s cubic-bezier(0.4, 0, 0.6, 1) 0.8s infinite',
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
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 163, 82, 0.5)' },
          '50%': { boxShadow: '0 0 0 22px rgba(201, 163, 82, 0)' },
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
        'gold-gradient': 'linear-gradient(135deg, #8B6A20 0%, #C9A352 50%, #F5DFA0 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #8B6A20 0%, #F5DFA0 50%, #8B6A20 100%)',
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,163,82,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(201, 163, 82, 0.15), 0 0 80px rgba(201, 163, 82, 0.05)',
        'gold-glow-lg': '0 0 60px rgba(201, 163, 82, 0.25), 0 0 120px rgba(201, 163, 82, 0.08)',
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.12)',
        'card-hover': '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,163,82,0.3)',
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
