import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: 'hidden', // Generate sourcemaps but don't include references in the bundle
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@heroicons/react', 'clsx', 'tailwindcss'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@heroicons/react/24/outline',
      'clsx',
    ],
    exclude: ['@babel/runtime'],
  },
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT ? parseInt(process.env.PORT) : 5174, // Use PORT env variable or fallback to 5174
    hmr: {
      overlay: false, // Disable the error overlay
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0', // Bind preview server to all network interfaces
    port: process.env.PORT ? parseInt(process.env.PORT) : 5174, // Use PORT env variable or fallback to 5174
  },
});
