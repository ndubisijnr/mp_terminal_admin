/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['inter-Regular', ...defaultTheme.fontFamily.sans],
        "inter-Bold": ['inter-Bold'],
        "inter-Medium": ['inter-Medium'],
        "inter-SemiBold": ['inter-SemiBold'],
      },
      colors:{
        primary: "#032B43",
        secondary: "#032B43",
        tertiary: "#CEE3FA",
        white: "#F7F7F7",
        gray_1: "#667085",
        gray_2: "#D0D5DD",
        gray_3: "#2F3A4B"
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),

  ],
}