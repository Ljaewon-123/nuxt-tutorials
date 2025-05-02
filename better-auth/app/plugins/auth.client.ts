export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.payload.serverRendered) {
    await useAuth().fetchSession()
  }
  else if (Boolean(nuxtApp.payload.prerenderedAt) || Boolean(nuxtApp.payload.isCached)) {
    // To avoid hydration mismatch
    nuxtApp.hook('app:mounted', async () => {
      await useAuth().fetchSession()
    })
  }
})
// ssr 방식으로 가져오면 미스매치 안나는거 아닌가 
