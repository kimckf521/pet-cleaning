import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Supporting brand colours (kept from the original identity / logo)
        'brand-blue': '#06b6d4', // Teal — now a supporting accent
        'brand-green': '#22c55e', // Fresh green — secondary accent
        // Warm & playful primary palette
        coral: {
          50: '#FFF1EF',
          100: '#FFE1DC',
          200: '#FFC7BE',
          300: '#FFA699',
          400: '#FF8574',
          500: '#FF6B5C',
          600: '#F0503F',
          700: '#C93B2C',
          DEFAULT: '#FF6B5C',
        },
        cream: '#FFF6EE', // Warm page background
        'cream-dark': '#FDEFE2', // Slightly deeper cream for alternating sections
        peach: '#FFD9B3', // Soft fills / highlights
        ink: '#2B2420', // Warm near-black for headings & strong text
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 14px 34px -12px rgba(255, 107, 92, 0.30)',
        soft: '0 10px 34px -14px rgba(43, 36, 32, 0.16)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
