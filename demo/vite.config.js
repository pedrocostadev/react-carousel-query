import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@primitives': path.resolve(__dirname, '../src/primitives'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@icons': path.resolve(__dirname, '../src/icons'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../public'),
    emptyOutDir: true,
  },
  publicDir: path.resolve(__dirname, 'assets'),
})
