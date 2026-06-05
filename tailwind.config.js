/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1a4a3a',
          dark: '#0d2f24',
          light: '#2d5a44',
        },
        gold: {
          DEFAULT: '#c9901a',
          light: '#e0b040',
          pale: '#f0d080',
        },
        cream: '#f8f4ed',
        charcoal: '#1e2a22',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
