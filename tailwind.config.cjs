/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grameenlink-green': '#2ecc71',
        'grameenlink-blue': '#3498db',
        'rural-bg': '#f5f5f5',
      },
      backgroundImage: {
        'rural-pattern': "url('/rural-pattern.svg')",
      }
    },
  },
  plugins: [],
}