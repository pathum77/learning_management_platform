// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt' ],
  tailwindcss: {
    exposeConfig: true,
    configPath: './tailwind.config.js'
  },
})
