import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import z from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)
  if (!email) {
    return { success: false, message: '이메일을 입력해주세요.' }
  }

  const config = useRuntimeConfig()

  // UUID 를 key로 저장하고 value에 토큰으로 하면 안넘어가서 좋을거같은데 쿠키같은거 필요없고
  const uuid = randomUUID()
  const storage = useStorage('data')

  // payload에 이메일과 토큰 용도(type: 'magic')를 포함하여 15분 만료 JWT 생성
  const tokenPayload = { email, type: 'magic' }
  const magicToken = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '15m' })

  storage.setItem(uuid, magicToken)

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  // const magicLink = `${baseUrl}/auth/verify?token=${magicToken}`

  return { success: true, token: uuid }
})