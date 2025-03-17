// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@formkit/auto-animate",
    "@nuxtjs/google-fonts",
  ],
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
  googleFonts: {
    families: {
      Kanit: true,
    },
  },
  compatibilityDate: "2025-03-17",
});
