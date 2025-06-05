// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-nodemailer',
  ],
  nodemailer: {
    host: process.env.MAIL_HOST, //'smtp.ethereal.email',
    port: Number(process.env.MAIL_PORT), //587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    from: process.env.MAIL_USER,
    // secure: true, // fake 메일로 할때는 꺼야할듯 
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      auth: {
        redirectUserTo: '/user',
        redirectGuestTo: '/',
      },
    },
  },
})