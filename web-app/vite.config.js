import { defineConfig } from 'vite'
const { initializeApp } = require('firebase-admin/app');
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
