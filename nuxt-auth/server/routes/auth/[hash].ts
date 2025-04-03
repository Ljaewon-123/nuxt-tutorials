import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

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
      },
      secure: {
        apiToken: '1234567890test'
      },
    })

    sendRedirect(event, '/', 302)
  } catch (error) {
    console.error(error)
    sendRedirect(event, '/login')
  } finally {
    await storage.removeItem(magicToken as string)
  }

  return { success: true, message: '인증이 완료되었습니다.' }
})