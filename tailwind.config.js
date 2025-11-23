/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brandBlue: '#0F6FFF',
        brandNavy: '#0A1F44',
      },
      boxShadow: {
        elevation: '0 20px 45px rgba(15, 111, 255, 0.08)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease both',
      },
    },
  },
  plugins: [],
};

