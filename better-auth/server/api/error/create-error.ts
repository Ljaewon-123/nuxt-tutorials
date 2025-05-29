export default defineEventHandler(async (event) => {
  throw createError({
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'An unexpected error occurred while processing your request.'
  })
})

// Nitro가 기록하지 않는다. 좋다.