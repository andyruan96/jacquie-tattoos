import { nextui } from '@nextui-org/react';
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
