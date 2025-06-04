export default defineEventHandler(async (event) => {
  throw new Error('new Error: using Error object')
})