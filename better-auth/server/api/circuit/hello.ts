// server/api/hello.ts
export default defineEventHandler(async () => {
  const random = Math.random()
  if (random < 0.4) {
    console.log('Success')
    await new Promise(resolve => setTimeout(resolve, 1500)) // 지연
  } else  {
    console.log('Failure')
    throw createError({ statusCode: 500, message: 'Random failure' }) // 실패
  }

  return { message: 'Hello from backend!' }
})
