/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#ad8815',
        'custom-yellow-dark': '#957512',
        'custom-maroon': '#3f0808',
        'custom-ivory': '#fffff0',
      }
    },
  },
  plugins: [],
}


