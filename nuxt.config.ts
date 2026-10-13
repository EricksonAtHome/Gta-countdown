// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'GTA 6 Countdown',
      meta: [
        {
          name: 'description',
          content: 'Countdown to the Grand Theft Auto VI release.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    logoDevSecretKey: '',
    public: {
      logoDevPublishableKey: '',
      logoDomain: 'rockstargames.com',
      // Official Fall 2026 window — set to match the design’s ~42-day window from Oct 2026.
      releaseDate: '2026-11-19T00:00:00.000Z',
    },
  },
})
