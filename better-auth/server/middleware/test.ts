export default defineEventHandler(async (event) => {
  event.context.auth = { user: 123 }
  const session = await auth.api.getSession({
    headers: event.headers
  });

  // 서버에서 세션 접근
  console.log(session)
  // if(!session) {
  //   return {
  //     statusCode: 401
  //   }
  // }
})

