// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    server: process.env.SERVER,
    public: {
      client: process.env.CLIENT
    }
  }
})
