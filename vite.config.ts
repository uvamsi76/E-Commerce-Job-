import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv-webpack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
})
