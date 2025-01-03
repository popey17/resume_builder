/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F6A365',
        'primaryHover': '#FAC094',
        'secondary': '#BCCCDC',
        'error': '#F16464',
        'background': '#F7F7F7',
      },
      fontFamily: {
        'homeTitle': ['Bitter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

