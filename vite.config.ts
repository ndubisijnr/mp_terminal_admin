import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "node:url"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  preview:{
    host: "0.0.0.o"
  },
  resolve:{
    alias:{
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
