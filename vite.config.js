import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['fsevents'], // Exclude fsevents from optimization
  },
  build: {
    rollupOptions: {
      external: ['fsevents'], // Mark fsevents as an external dependency
    },
    chunkSizeWarningLimit: 1000, // (Optional) Increase warning limit

  },
});
