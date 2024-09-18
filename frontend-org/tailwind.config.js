/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  options: {
    safelist: ['job-opening'], // Add this to safelist the class
  },
  theme: {
    extend: {
      colors:{
        'input':'#E8F0FD',
        'primary':'#6993FF',
        'searchbar':'#20213D',
        'secondary':'#EFF3FF',

      },
      fontFamily: {
         'manrope':"Outfit"
      }
     

    },
  },
  plugins: [],
}

