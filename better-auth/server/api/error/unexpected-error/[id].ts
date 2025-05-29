export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const id = params.id as number
  return id.toFixed(2)
})