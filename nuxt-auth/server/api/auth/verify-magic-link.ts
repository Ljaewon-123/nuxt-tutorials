import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (!token) {
    return { success: false, message: '토큰이 제공되지 않았습니다.' }
  }

  const config = useRuntimeConfig()

  console.log(jwt.verify(token as string, config.jwtSecret))

  return { success: true, message: '인증이 완료되었습니다.' }
})