
// 그.... 이름이 뭐더라 아무튼 직접선언으로 하는게 더 좋을거같음
export default defineNuxtRouteMiddleware((to, from) => {
  const authToken = to.query.token
  if (!authToken) {
    return navigateTo('/login')
  }
})