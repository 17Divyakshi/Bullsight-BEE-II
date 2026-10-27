/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: 'var(--bg-app)',
        sidebar: 'var(--bg-sidebar)',
        surface: 'var(--bg-secondary)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
        hoverSurface: 'var(--bg-hover)',
        emerald: {
          DEFAULT: 'var(--primary-emerald)',
          bright: 'var(--bright-emerald)',
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        blue: {
          DEFAULT: 'var(--secondary-blue)',
          500: '#38bdf8',
          600: '#2563eb',
        },
        violet: {
          DEFAULT: 'var(--secondary-violet)',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        positive: 'var(--market-positive)',
        negative: 'var(--market-negative)',
        warning: 'var(--market-warning)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        border: 'var(--border-color)',
        borderSubtle: 'var(--border-subtle)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.35), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        cardHover: '0 12px 32px -4px rgba(0, 208, 132, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.4)',
        cardGlow: '0 0 20px -2px rgba(0, 208, 132, 0.22)',
        emeraldGlow: '0 0 25px -2px rgba(0, 208, 132, 0.45)',
        blueGlow: '0 0 25px -2px rgba(45, 212, 191, 0.4)',
      },
    },
  },
  plugins: [],
}
