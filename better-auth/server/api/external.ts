export default defineEventHandler(async (event) => {

  const session = await auth.api.getSession({
    headers: event.headers
  });
  console.log(session?.user)

  $fetch('http://localhost:4000/', {
    method: "POST",
    headers: {
      'x-user': JSON.stringify(session?.user)
    }
  })
  
  return {
    status: 200,
    message: 'Request successful' 
  }
})