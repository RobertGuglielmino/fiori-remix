import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0.61, 1, 0.88, 1)',
          },
          '25%': {
            transform: 'translateY(-1%)',
            animationTimingFunction: 'cubic-bezier(0.12, 0, 0.39, 0)',
          },
          '50%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0.61, 1, 0.88, 1)',
          },
          '75%': {
            transform: 'translateY(1%)',
            animationTimingFunction: 'cubic-bezier(0.12, 0, 0.39, 0)',
          },
        }
      },
      animation: {
        'float': 'float 1s infinite',

        
      },
      fontFamily: {
        custom: ['Turbo', 'sans-serif'],
        magic: ['Magic', 'sans-serif'],
        vegas: ['Vegas', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@lostisworld/tailwind-mask'),
  ],
  darkMode: 'selector',
} satisfies Config
