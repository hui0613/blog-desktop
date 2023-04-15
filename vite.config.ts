import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dewTs } from './plugins/DewTs'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import * as path from 'path'

export default defineConfig({
  plugins: [
    ElementPlus({}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    dewTs({
      include: 'src/app',
      baseUrl: 'src/app',
    }),
  ],
  resolve: {
    alias: {
      '@render': path.resolve(__dirname, './src/render/'),
    },
  },
})
