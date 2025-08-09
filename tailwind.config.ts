import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0F1230', // deep navy
          800: '#1a1f3a',
          700: '#252b44',
          600: '#30374e',
          500: '#3b4358',
          400: '#464f62',
          300: '#515b6c',
          200: '#5c6776',
          100: '#677380',
        },
        accent: {
          500: '#FF6F61', // vibrant coral
          400: '#ff7f73',
          300: '#ff8f85',
          200: '#ff9f97',
          100: '#ffafa9',
        },
        muted: {
          100: '#F6F7FB', // soft white
          200: '#e9ecf0',
          300: '#dce1e5',
          400: '#cfd6da',
          500: '#c2cbcf',
        },
        gold: {
          400: '#FFD166', // accent gold
          300: '#ffd773',
          200: '#ffdd80',
          100: '#ffe38d',
        },
        neutral: {
          600: '#6B7280', // neutral text
          500: '#78828a',
          400: '#859194',
          300: '#92a19e',
          200: '#9fb0a8',
          100: '#acc0b2',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-lg': ['34px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'display-md': ['24px', { lineHeight: '1.4', letterSpacing: '0' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'zoom': 'zoom 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
