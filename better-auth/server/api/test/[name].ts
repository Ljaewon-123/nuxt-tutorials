export default defineEventHandler(async (event) => {

  const params = getRouterParam(event, 'name')

  // console.log(params.toFxied(2))
  throw createError({
    message: 'Hello',
    statusCode: 500,
    statusMessage: 'Server Error'
  })
});