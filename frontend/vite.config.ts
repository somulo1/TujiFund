import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Adjust the limit as needed
    cssCodeSplit: true, // Enable CSS code splitting
  },
  optimizeDeps: {
    include: ['your-large-dependency'], // Add any large dependencies to pre-bundle
    exclude: ['lucide-react'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // Set environment variable
  },
});
