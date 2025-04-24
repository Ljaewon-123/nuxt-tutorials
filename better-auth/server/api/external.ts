export default defineEventHandler(async (event) => {

  const user = event.context.user
  console.log(user)

  // $fetch('http://localhost:4000/', {
  //   method: "POST",
  //   headers: {
  //     'X-User-Id': user.id,
  //     'X-User-Role': user.role
  //   }
  // })
  
  return {
    status: 200,
    message: 'Request successful' 
  }
})