import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'google': '0 1px 6px 0 rgba(32, 33, 36, 0.278)',
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      },
      colors: {
        'base': '#202124',
        'light': '#5f6368ff'
      },
      placeholderColor: {
        'base': '#5f6368ff',
        'red': '#EF4444'
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
  ],
}
export default config
