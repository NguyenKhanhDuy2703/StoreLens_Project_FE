import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  theme: {
    extends: {
      colors :{
        red: "#EF4444",
        orange: "#F97316",
        yellow: "#EAB308",
        green: "#22C55E",
        blueLight: "#06B6D4",
        blueDark: "#3B82F6",
        purple: "#8B5CF6",
        white: "#FFFFFF",
        black: "#000000",
        greenLight: "#E3FCEB",
        pinkLight: "#FEEAEA",
        blueLighter: "#E9F2FF",
        orangeLight: "#FEFCE8",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    }
  }


})
