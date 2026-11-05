/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base path ensures zero 404s across GitHub Pages sub-directories
  base: process.env.VITE_BASE_PATH || './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-codemirror': [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/lang-rust',
            '@codemirror/theme-one-dark',
            '@codemirror/language',
            '@codemirror/commands',
          ],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
  },
});
