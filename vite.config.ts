import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prismjsPlugin } from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    react(),
    prismjsPlugin({
      languages: 'all',
      plugins: ['line-numbers', 'show-language'],
      theme: 'twilight',
      css: true
    })
  ],
})
