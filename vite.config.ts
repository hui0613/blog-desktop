import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dewTs } from './plugins/DewTs'

export default defineConfig({
  plugins: [
    vue(),
    dewTs({
      include: 'src/app',
      baseUrl: 'src/app',
    }),
  ],
})
