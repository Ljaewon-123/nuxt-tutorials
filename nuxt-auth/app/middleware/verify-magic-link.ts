import jwt from 'jsonwebtoken'

export default defineNuxtRouteMiddleware((to, from) => {
  const authToken = useCookie('authToken').value
  if (!authToken) {
    return navigateTo('/login')
  }

  const config = useRuntimeConfig()

  try {
    jwt.verify(authToken, config.jwtSecret)
  } catch (error) {
    return navigateTo('/login')
  }
})