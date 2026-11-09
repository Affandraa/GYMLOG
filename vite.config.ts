import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  base: './',
=======
  // GitHub Pages serves project sites from /<repository-name>/.
  base: '/GYMLOG/',
>>>>>>> 02a6cd7594d88fda515e4dac20a0807756ec060a
  plugins: [
    react(),
    tailwindcss(),
  ],
})
