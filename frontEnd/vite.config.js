// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Check if the module is in node_modules and create a vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Example of splitting components into different chunks
          if (id.includes('src/components/home')) {
            return 'home';
          }
          if (id.includes('src/components/user')) {
            return 'user';
          }
          if (id.includes('src/components/fixtures')) {
            // Example: Split all fixture components into a single chunk
            return 'fixtures';
          }
          if (id.includes('src/components/NavRedirects')) {
            // Example: Split navigation redirects into a single chunk
            return 'navRedirects';
          }
          if (id.includes('src/components/bill')) {
            // Example: Split billing components into a single chunk
            return 'bill';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase the chunk size warning limit to 600 KB
  },
});
