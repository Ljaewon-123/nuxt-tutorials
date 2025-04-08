import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    'nuxt-auth-utils',
    ['nuxt-mail', 
      {
        message:{
          to: process.env.MAIL_USER,
        },
        smtp: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          }
        },
      },
    ], 
  ],
  runtimeConfig:{
    jwtSecret: process.env.JWT_SECRET,
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      },
    },
    public: {
      mail: {
        to: process.env.MAIL_USER
      }
    }
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css:[
    '~/styles/styles.css'
  ],
})