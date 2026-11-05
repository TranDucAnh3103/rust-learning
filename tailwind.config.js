/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          elevated: 'var(--background-elevated)',
        },
        glass: {
          surface: 'var(--glass-surface)',
          hover: 'var(--glass-surface-hover)',
          border: 'var(--glass-border)',
          highlight: 'var(--glass-highlight)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          rust: 'var(--accent-rust)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        status: {
          success: 'var(--status-success)',
          error: 'var(--status-error)',
          warning: 'var(--status-warning)',
          info: 'var(--status-info)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'glow-rust': '0 0 25px -5px rgba(249, 115, 22, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
