/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#030DA6',
        'blue-dark': '#020a8a',
        red: '#8C1D1C',
        'red-dark': '#6e1615',
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
