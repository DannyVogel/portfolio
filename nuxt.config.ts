// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    placesPassword: '',
    loggerApiKey: '',
    public: {
      placesApiUrl: '',
      placesApiKey: '',
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@formkit/auto-animate",
    "@nuxt/fonts",
    "@nuxt/content",
  ],
  nitro: {
    preset: "cloudflare_pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "one-dark-pro",
        },
      },
    },
    preview: {
      api: "https://api.nuxt.studio",
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
    families: [
      { name: "Inter", provider: "google" },
    ],
  },
  compatibilityDate: "2025-03-17",
});