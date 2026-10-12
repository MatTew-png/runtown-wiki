/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#050806',
        paper: '#0a100c',
        card: '#101914',
        cardHover: '#16221b',
        line: 'rgba(69, 242, 180, 0.25)',
        lineSubtle: 'rgba(255, 255, 255, 0.12)',
        mint: '#45f2b4',
        lime: '#a5ff5f',
        danger: '#ff4d6d',
        warning: '#f59e0b',
        info: '#38bdf8',
        gold: '#fbbf24',
        textMain: '#ffffff',
        textSoft: '#e2e8f0',   // Bright, crisp high contrast text
        textMuted: '#94a3b8',  // Crisp high visibility slate
      },
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
        display: ['Prompt', 'sans-serif'],
        mono: ['JetBrains Mono', 'Prompt', 'monospace'],
      },
      boxShadow: {
        'neon-mint': '0 0 25px rgba(69, 242, 180, 0.45)',
        'neon-lime': '0 0 25px rgba(165, 255, 95, 0.45)',
        'neon-amber': '0 0 25px rgba(245, 158, 11, 0.45)',
        'neon-danger': '0 0 25px rgba(255, 77, 109, 0.45)',
        'neon-card': '0 10px 40px rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'marquee': 'marquee 80s linear infinite',
        'marquee-fast': 'marquee 30s linear infinite',
        'scanline': 'scanline 6s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
};
