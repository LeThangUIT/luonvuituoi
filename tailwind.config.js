/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#EE4C7E',
        'secondaryColor': '#FDEDF2',
        'blackColor': '#300F19'
      },
      height: {
        'fit-content': 'fit-content'
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },

  },
  plugins: [
    
  ],
}
