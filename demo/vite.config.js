import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const useLocal = env.USE_LOCAL === 'true'

  return {
    plugins: [react()],
    resolve: useLocal
      ? {
          alias: [
            // When using local source, CSS modules are auto-loaded by components
            // so we resolve the styles.css import to an empty module
            {
              find: 'react-carousel-query/styles.css',
              replacement: path.resolve(__dirname, './emptyStyles.js'),
            },
            {
              find: 'react-carousel-query',
              replacement: path.resolve(__dirname, '../src/index.js'),
            },
            { find: '@components', replacement: path.resolve(__dirname, '../src/components') },
            { find: '@hooks', replacement: path.resolve(__dirname, '../src/hooks') },
            { find: '@primitives', replacement: path.resolve(__dirname, '../src/primitives') },
            { find: '@icons', replacement: path.resolve(__dirname, '../src/icons') },
            { find: '@utils', replacement: path.resolve(__dirname, '../src/utils') },
          ],
        }
      : {},
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    publicDir: 'assets',
  }
})
