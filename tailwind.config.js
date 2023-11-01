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
      },
      backgroundColor:{
        'light-grey' : '#2B2D34',
        'bright-blue' :'#202B3C', 
        'main-blue' : '#1F5CF8',
      },
      borderColor:{
        'super-light-grey' :'#3D3F46',
        'bright-blue':'#1F5399',
      },
      textColor:{
        'greyish-white':'#A8A8AB',
      }
    },
  },
  plugins: [],
}

