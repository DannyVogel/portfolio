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
  tailwindcss: {
    viewer: false,
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  googleFonts: {
    families: {
      Kanit: true,
    },
  },
  ui: {
    icons: ["heroicons", "ph", "logos", "noto-v1"],
  },
});
