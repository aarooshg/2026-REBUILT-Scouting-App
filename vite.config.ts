import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vuetify({ autoImport: true })],
  define: { APP_VERSION: `"${packageJson.version}"` },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
});

