/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        sm: '676px',
        md: '768px',
        lg: '976px',
        subxl: '1150px',
        xl: '1440px',
      },
      colors: {
        // #038282
        // primary: '#FF4804',
        primary: '#05a16d',
        // primary: 'white',
        // secondary: 'white',
        secondary: '#c193b8',
        info: '#FF4804'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light']
  }
});



