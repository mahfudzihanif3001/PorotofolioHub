import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
      },
      colors: {
        // Cyberpunk theme colors
        neon: {
          green: '#00ff41',
          pink: '#ff00ff',
          blue: '#00d4ff',
        },
        // Corporate theme colors
        corporate: {
          navy: '#1e3a5f',
          gold: '#c9a227',
        },
        // Creative theme colors
        pastel: {
          pink: '#ffd1dc',
          blue: '#b4d7e8',
          yellow: '#fff9c4',
          green: '#c8e6c9',
          purple: '#e1bee7',
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          '100%': { boxShadow: '0 0 20px #00ff41, 0 0 30px #00ff41' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
