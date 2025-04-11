export default defineEventHandler(async (event) => {
  console.log(event.context)
  return 'Hello World!'
})
