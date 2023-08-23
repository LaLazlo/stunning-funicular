/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '38rem',
      },
      colors: {
        offerscolor2: '#c8c4c5ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}