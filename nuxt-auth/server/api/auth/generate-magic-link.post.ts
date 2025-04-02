import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  if (!email) {
    return { success: false, message: '이메일을 입력해주세요.' }
  }

  const config = useRuntimeConfig()

  // payload에 이메일과 토큰 용도(type: 'magic')를 포함하여 15분 만료 JWT 생성
  const tokenPayload = { email, type: 'magic' }
  const magicToken = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '15m' })

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  // const magicLink = `${baseUrl}/auth/verify?token=${magicToken}`

  // ★ 이미 테스트 완료된 이메일 전송 로직을 여기서 호출하면 됩니다 ★

  return { success: true, token: magicToken }
})