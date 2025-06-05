export default defineEventHandler(async (event) => {
  event.context.auth = { user: 123 }
  const session = await auth.api.getSession({
    headers: event.headers
  });

  // 서버에서 세션 접근
  // 이걸로 막고 context에 서 보낸다고?
  console.log(session, 'HI i am middleware')
  // if(!session) {
  //   return {
  //     statusCode: 401
  //   }
  // }
})

