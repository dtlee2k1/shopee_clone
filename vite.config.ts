// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as any,
  server: {
    port: 3000
  },
  test: {
    environment: 'jsdom'
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
