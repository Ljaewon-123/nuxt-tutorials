import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('/api/get-user/[id]', async () => {
  await setup({
    server: true
  })

  it('should return user data for valid id', async () => {
    const response = await $fetch('/api/get-user/123')
    
    expect(response).toEqual({
      message: 'found user123',
      user: {
        id: 123,
        email: 'email@email.com'
      }
    })
  })

  it('should handle string id and coerce to number', async () => {
    const response = await $fetch('/api/get-user/456')
    
    expect(response.user.id).toBe(456)
    expect(typeof response.user.id).toBe('number')
  })

  it('should return 400 for invalid id', async () => {
    try {
      await $fetch('/api/get-user/invalid')
    } catch (error: any) {
      expect(error.response.status).toBe(400)
    }
  })

  it('should handle zero id', async () => {
    const response = await $fetch('/api/get-user/0')
    
    expect(response.user.id).toBe(0)
    expect(response.message).toBe('found user0')
  })
})
