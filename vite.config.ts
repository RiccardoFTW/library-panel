import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // Auto-import dei componenti Vue
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      // Genera nomi univoci basati sul percorso del file
      directoryAsNamespace: false,
      // Usa il nome del file come nome del componente
      // Se ci sono conflitti, puoi abilitare directoryAsNamespace: true
      resolvers: [],
    }),
    // Auto-import di Vue APIs, composables, etc.
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
        },
      ],
      dirs: ['src/composables', 'src/stores'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
