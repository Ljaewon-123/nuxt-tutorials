// auth.global.ts 
// 위 파일명으로 글로벌로 만들면 각 페이지에 대한 리디렉션 처리를 여기서 해야함 
// useAuth()를 더 디벨롭해서 클라이언트 인증과 better-auth client로 처리 

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log(to)
  const { authClient } = useAuth()
  const { data: session } = await authClient.useSession(useFetch)

  if(!session.value) {
    return navigateTo('/sign-up-in')
  }
})