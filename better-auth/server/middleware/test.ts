export default defineEventHandler(async (event) => {
  event.context.auth = { user: 123 }
  const session = await auth.api.getSession({
    headers: event.headers
  });

  // 로그인 여부로 return하기 위한 마들웨어 세션 체크
  console.log(session)
})
