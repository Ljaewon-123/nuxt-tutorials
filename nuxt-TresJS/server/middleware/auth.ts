export default defineEventHandler((event) => {
  // GET이 아닌것만 막으면 일단 되겠네
  console.log(event.method)
  // Will only execute for /auth route
  if (getRequestURL(event).pathname.endsWith('/test')) {
    console.log('that is true')
    event.context.user = { name: 'Nitro' }
  }
})
