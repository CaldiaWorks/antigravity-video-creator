/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2962FF", // Brilliant Blue
        secondary: "#00B8D4", // Vibrant Cyan
        accent: "#FFAB00", // Amber
        text: "#37474F", // Blue Grey
        bg: "#F5F7FA", // Light Background
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', 'Meiryo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
