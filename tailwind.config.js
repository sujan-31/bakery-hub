/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          50: '#fffaf5',
          100: '#fef3e7',
          200: '#fce2c8',
          300: '#f9cca0',
          400: '#f4a567',
          500: '#ee7f34',
          600: '#df631b',
          700: '#b94814',
          800: '#943a18',
          900: '#773216',
          950: '#40170a',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f6ef',
          200: '#f2ecdc',
          300: '#e7dcbe',
          400: '#dbc79c',
          500: '#cbaf7a',
        }
      },
    },
  },
  plugins: [],
}
