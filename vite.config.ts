import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todoApp/', // Change this to your actual repository name
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
