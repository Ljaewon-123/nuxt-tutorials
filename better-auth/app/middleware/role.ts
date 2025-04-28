// auth.ts 참조 
export default defineNuxtRouteMiddleware(async (event) => {
  const { session, user } = useAuth()

  console.log(user.value?.role)
})