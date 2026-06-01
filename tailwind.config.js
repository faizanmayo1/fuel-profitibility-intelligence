import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Fuel brand palette
        canvas: {
          DEFAULT: '#F7F9FB',
          subtle: '#EEF2F6',
          raised: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#0B1220',
          muted: '#475467',
          subtle: '#8A93A2',
          faint: '#B7BFCB',
        },
        hairline: {
          DEFAULT: '#E4E9EF',
          strong: '#D2D9E1',
        },
        // Sovereign navy — Fuel primary
        sovereign: {
          DEFAULT: '#0E2C4A',
          50: '#EEF3F8',
          100: '#D2DEEC',
          200: '#A5BDDA',
          300: '#789CC7',
          400: '#4B7BB4',
          500: '#0E2C4A',
          600: '#0B2440',
          700: '#081B31',
          800: '#051322',
          900: '#020A13',
        },
        // Emerald — Fuel accent (profit, positive)
        emerald: {
          DEFAULT: '#0E8F6E',
          soft: '#D6F0E6',
          deep: '#0A6E55',
        },
        signal: {
          positive: '#0E8F6E',
          'positive-soft': '#D6F0E6',
          warning: '#D97706',
          'warning-soft': '#FEF3C7',
          risk: '#DC2626',
          'risk-soft': '#FEE2E2',
          info: '#1D4ED8',
          'info-soft': '#DBE6FF',
          neutral: '#64748B',
          'neutral-soft': '#F1F5F9',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(11, 18, 32, 0.04), 0 1px 1px rgba(11, 18, 32, 0.02)',
        card: '0 1px 3px rgba(11, 18, 32, 0.06), 0 1px 2px rgba(11, 18, 32, 0.04)',
        'card-md': '0 4px 12px rgba(11, 18, 32, 0.06), 0 2px 4px rgba(11, 18, 32, 0.04)',
        'card-lg': '0 12px 32px rgba(11, 18, 32, 0.08), 0 4px 8px rgba(11, 18, 32, 0.04)',
        inset: 'inset 0 0 0 1px rgba(11, 18, 32, 0.06)',
      },
      letterSpacing: {
        'tight-bank': '-0.018em',
        'wide-eyebrow': '0.08em',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
}
