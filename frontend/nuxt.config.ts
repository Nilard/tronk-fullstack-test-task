// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      transitions: false,
    },
  },
  app: {
    head: {
      title: 'To-Do List',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', name: 'Russian', file: 'ru.json' },
    ],
  },
})