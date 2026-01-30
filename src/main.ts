import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { md2 } from 'vuetify/blueprints';
import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue';

const app = createApp(App);

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  blueprint: md2,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#b8860b',
          background: '#000000',
          surface: '#33333a',
          accent: '#8b0000',
          secondary: '#74560D',
          'on-secondary': '#000000',
        },
      },
    },
  },
});

app.use(vuetify);
app.mount('#app');

