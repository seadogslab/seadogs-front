module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        deepBg: '#F05D5E',
        'lavender-blue': '#D69FFF',
        'light-blue': '#9DE1FF',
        'banana-mania': '#ECE043',
        'pink-lavender': '#ED9BED',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
