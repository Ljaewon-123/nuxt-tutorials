import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  if (!email) {
    return { success: false, message: '이메일을 입력해주세요.' }
  }

  const config = useRuntimeConfig()

  // UUID 를 key로 저장하고 value에 토큰으로 하면 안넘어가서 좋을거같은데 쿠키같은거 필요없고
  const uuid = randomUUID()
  const storage = useStorage()

  // payload에 이메일과 토큰 용도(type: 'magic')를 포함하여 15분 만료 JWT 생성
  const tokenPayload = { email, type: 'magic' }
  const magicToken = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '15m' })

  storage.setItem(uuid, magicToken)

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  // const magicLink = `${baseUrl}/auth/verify?token=${magicToken}`

  // ★ 이미 테스트 완료된 이메일 전송 로직을 여기서 호출하면 됩니다 ★

  return { success: true, token: uuid }
})