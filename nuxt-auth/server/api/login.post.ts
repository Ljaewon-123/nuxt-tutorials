import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === 'admin@admin.com' && password === 'iamtheadmin') {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: 'John Doe'
      }
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials'
  })
})
