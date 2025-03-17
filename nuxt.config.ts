import { getIconCollections } from "@egoist/tailwindcss-icons";

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

  // ui: {
  //   icons: {
  //     extraProperties: { "mask-size": "contain", "mask-position": "center" },
  //     collections: {
  //       ...getIconCollections([
  //         "heroicons",
  //         "ph",
  //         "logos",
  //         "noto-v1",
  //         "eos-icons",
  //       ]),
  //     },
  //   },
  // },
  googleFonts: {
    families: {
      Kanit: true,
    },
  },

  compatibilityDate: "2025-03-17",
});