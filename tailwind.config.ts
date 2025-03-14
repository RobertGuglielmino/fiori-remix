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
        },
        
        foil: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        'float': 'float 2s infinite',
        'foil': 'foil 3s infinite linear', // Slower animation
      },
      backgroundImage: {
        'foil-ray': 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 60%)'
      },
      // Define a utility for the background size
      backgroundSize: {
        '400': '400% 400%'
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
    require("tailwindcss-animation-delay"),
  ],
  darkMode: 'selector',
} satisfies Config
