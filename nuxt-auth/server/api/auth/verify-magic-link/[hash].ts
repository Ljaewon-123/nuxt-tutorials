import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'hash')
  if (!token) {
    return { success: false, message: '토큰이 제공되지 않았습니다.' }
  }

  const storage = useStorage('data')
  const magicToken = await storage.getItem(token as string)

  const config = useRuntimeConfig()

  try {
    jwt.verify(magicToken as string, config.jwtSecret)

    await setUserSession(event, {
      user: {
        name: '<USER_NAME>'
      }
    })
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 401,
      message: 'logined failed'
    })
  }

  return { success: true, message: '인증이 완료되었습니다.' }
})