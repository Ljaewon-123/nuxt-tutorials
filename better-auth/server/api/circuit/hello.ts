// server/api/hello.ts
export default defineEventHandler(async () => {
  const random = Math.random()
  console.log(random)
  if (random < 0.4) {
    await new Promise(resolve => setTimeout(resolve, 3000)) // 지연
  } else if (random < 0.7) {
    throw createError({ statusCode: 500, message: 'Random failure' }) // 실패
  }

  return { message: 'Hello from backend!' }
})
