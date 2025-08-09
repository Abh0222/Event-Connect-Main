// VibeSphere Design System Tokens
// This file contains all design tokens used throughout the application

export const colors = {
  // Primary Palette
  primary: {
    900: '#0F1230', // Deep navy - main text, headers
    800: '#1a1f3a',
    700: '#252b44',
    600: '#30374e',
    500: '#3b4358',
    400: '#464f62',
    300: '#515b6c',
    200: '#5c6776',
    100: '#677380',
  },
  
  // Accent Colors
  accent: {
    500: '#FF6F61', // Vibrant coral - CTAs, highlights
    400: '#ff7f73',
    300: '#ff8f85',
    200: '#ff9f97',
    100: '#ffafa9',
  },
  
  // Muted/Background Colors
  muted: {
    100: '#F6F7FB', // Soft white - main background
    200: '#e9ecf0',
    300: '#dce1e5',
    400: '#cfd6da',
    500: '#c2cbcf',
  },
  
  // Gold Accent
  gold: {
    400: '#FFD166', // Accent gold - special elements
    300: '#ffd773',
    200: '#ffdd80',
    100: '#ffe38d',
  },
  
  // Neutral Text Colors
  neutral: {
    600: '#6B7280', // Main neutral text
    500: '#78828a',
    400: '#859194',
    300: '#92a19e',
    200: '#9fb0a8',
    100: '#acc0b2',
  },
  
  // Semantic Colors
  success: {
    600: '#059669',
    500: '#10b981',
    400: '#34d399',
    300: '#6ee7b7',
    200: '#a7f3d0',
    100: '#d1fae5',
  },
  
  warning: {
    600: '#d97706',
    500: '#f59e0b',
    400: '#fbbf24',
    300: '#fcd34d',
    200: '#fde68a',
    100: '#fef3c7',
  },
  
  error: {
    600: '#dc2626',
    500: '#ef4444',
    400: '#f87171',
    300: '#fca5a5',
    200: '#fecaca',
    100: '#fee2e2',
  },
  
  // Utility Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const

export const typography = {
  // Font Families
  fontFamily: {
    display: ['Playfair Display', 'serif'],
    body: ['Inter', 'sans-serif'],
  },
  
  // Font Sizes with Line Heights and Letter Spacing
  fontSize: {
    'display-xl': {
      size: '48px',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    },
    'display-lg': {
      size: '34px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    'display-md': {
      size: '24px',
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: '500',
    },
    'heading-lg': {
      size: '20px',
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: '600',
    },
    'heading-md': {
      size: '18px',
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: '600',
    },
    'body-lg': {
      size: '18px',
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: '400',
    },
    'body': {
      size: '16px',
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: '400',
    },
    'body-sm': {
      size: '14px',
      lineHeight: '1.5',
      letterSpacing: '0.01em',
      fontWeight: '400',
    },
    'caption': {
      size: '12px',
      lineHeight: '1.4',
      letterSpacing: '0.02em',
      fontWeight: '500',
    },
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export const spacing = {
  // 4/8 Grid System
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '5rem',   // 80px
  '5xl': '6rem',   // 96px
  '6xl': '8rem',   // 128px
  
  // Component Specific
  'button-sm': '0.75rem 1rem',     // 12px 16px
  'button-md': '0.875rem 1.5rem',  // 14px 24px
  'button-lg': '1rem 2rem',        // 16px 32px
  'input-sm': '0.5rem 0.75rem',    // 8px 12px
  'input-md': '0.75rem 1rem',      // 12px 16px
  'input-lg': '1rem 1.25rem',      // 16px 20px
  'card': '1.5rem',                // 24px
  'section': '4rem 0',             // 64px 0
} as const

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const

export const shadows = {
  // Card Shadows
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  
  // Focus Shadows
  'focus-primary': '0 0 0 3px rgba(15, 18, 48, 0.1)',
  'focus-accent': '0 0 0 3px rgba(255, 111, 97, 0.2)',
  
  // Hover Shadows
  'hover-card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Inner Shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // No Shadow
  none: 'none',
} as const

export const animation = {
  // Duration
  duration: {
    fast: '120ms',
    normal: '200ms',
    slow: '400ms',
    slower: '600ms',
  },
  
  // Easing
  easing: {
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Keyframes
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    zoom: {
      '0%': { transform: 'scale(1)' },
      '100%': { transform: 'scale(1.04)' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: '2.25rem',  // 36px
      md: '2.75rem',  // 44px
      lg: '3.25rem',  // 52px
      xl: '4rem',     // 64px
    },
    padding: {
      sm: '0 0.75rem',
      md: '0 1.5rem',
      lg: '0 2rem',
      xl: '0 2.5rem',
    },
  },
  
  input: {
    height: {
      sm: '2.25rem',  // 36px
      md: '2.75rem',  // 44px
      lg: '3.25rem',  // 52px
    },
  },
  
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },
} as const

// Export all tokens as a single object
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  components,
} as const

export type DesignTokens = typeof designTokens
