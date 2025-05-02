// auth.global.ts 
// 위 파일명으로 글로벌로 만들면 각 페이지에 대한 리디렉션 처리를 여기서 해야함 
// useAuth()를 더 디벨롭해서 클라이언트 인증과 better-auth client로 처리 
// 리디렉션을 시작할때 부작용이 발생해서는 안된다. 

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log(to)
  const { isLoggedIn } = useAuth()

  if(!isLoggedIn.value) {
    return navigateTo('/sign-up-in')
  }
})