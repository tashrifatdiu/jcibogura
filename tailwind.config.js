/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2197cd',
        secondary: '#7cc7d0',
        accent: '#9b59b6',
        background: '#f3fafd',
        text: '#1d1a36',
      },
    },
  },
  plugins: [],
}

