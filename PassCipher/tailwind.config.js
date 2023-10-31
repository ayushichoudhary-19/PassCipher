/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity:{
        '10': '0.1',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '90': '0.9',
      }
    },
  },
  plugins: [],
}

