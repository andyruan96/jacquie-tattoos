import { colors, nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'summer-green': {
          DEFAULT: '#9bbfa4',
          dark: '#72a980',
        },
        'summer-blue': '#4e8575',
        'coconut-cream': 'rgb(var(--background-start-rgb) / <alpha-value>)',
        porsche: '#e99e57',
        'raw-sienna': {
          DEFAULT: '#d07746',
          dark: '#c06542',
        },
        ironstone: '#7e483a',
      },
      boxShadow: {
        bottom: '0 15px 10px -10px rgba(0, 0, 0, 0.1)',
      },
      // that is animation class
      animation: {
        fadeIn: 'fadeIn .5s linear',
        fadeOut: 'fadeOut .25s linear',
        fadeInMobile: 'fadeInMobile .5s linear',
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', bottom: '-30px' },
          '100%': { opacity: '1', bottom: '-5px' },
        },
        fadeInMobile: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }),
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
