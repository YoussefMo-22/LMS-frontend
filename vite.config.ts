import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(process.env.ANALYZE ? [visualizer({
      open: true,
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    })] : [])
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});