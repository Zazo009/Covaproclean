import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B1512',
          900: '#0F1F1A',
          800: '#16302A',
        },
        pine: {
          50: '#EEF6F2',
          100: '#D7EBE1',
          200: '#AFD8C4',
          300: '#7FC0A4',
          400: '#4CA483',
          500: '#2E8768',
          600: '#1F6B52',
          700: '#175443',
          800: '#124237',
          900: '#0D332B',
        },
        sand: {
          50: '#FBF9F4',
          100: '#F5F0E4',
          200: '#EAE1CC',
          300: '#DBCBA6',
        },
        coral: {
          400: '#E98A6B',
          500: '#DD6E49',
          600: '#C2573A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px -8px rgba(15, 31, 26, 0.15)',
        card: '0 2px 12px -2px rgba(15, 31, 26, 0.08)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
