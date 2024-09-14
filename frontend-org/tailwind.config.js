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
        'primary':'#8F75D0',
        'searchbar':'#20213D'

      },
      fontFamily: {
         'manrope':"Manrope"
      }
     

    },
  },
  plugins: [],
}

