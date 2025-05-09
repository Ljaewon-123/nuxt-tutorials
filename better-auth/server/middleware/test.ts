export default defineEventHandler(async (event) => {
  event.context.auth = { user: 123 }
  const session = await auth.api.getSession({
    headers: event.headers
  });

  console.log(session)
})
