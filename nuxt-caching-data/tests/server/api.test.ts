// tests/server/api.test.ts
import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe('/api/get-user/:1', async () => {
  await setup({
    // 서버만 실행 (클라이언트 렌더링 없음)
    server: true,
    browser: false
  })

  it('should return users list', async () => {
    const params = 1
    const users = await $fetch(`/api/get-user/${params}`)
    const user = {
      id: params,
      email: 'email@email.com'
    }
    expect(users).toStrictEqual({
      message: 'found user' + params,
      user
    })
  })

  it('should fail request', async() => {
    const params = 99
    const users = await $fetch(`/api/get-user/${params}`)
    const user = {
      id: 1,
      email: 'email@email.com'
    }
    expect(users).not.toStrictEqual({
      message: 'found user' + 1,
      user
    })
  })

  // 에러 케이스 테스트
  it('should not succeed with invalid id', async() => {
    try {
      await $fetch('/api/get-user/invalid')
      // 여기까지 오면 안됨
      expect(true).not.toBe(true) // 강제로 실패시키기
    } catch (error: any) {
      // 에러가 발생해야 함
      expect(error.response.status).not.toBe(200)
      expect(error.response._data).not.toHaveProperty('user')
    }
  })

  // 타입 검증
  it('should not have wrong types', async() => {
    const params = 15
    const users = await $fetch(`/api/get-user/${params}`)
    
    expect(typeof users.user.id).not.toBe('string')
    expect(typeof users.message).not.toBe('number')
    expect(Array.isArray(users)).not.toBe(true)
  })

  // 범위 테스트
  it('should not be out of expected range', async() => {
    const params = 20
    const users = await $fetch(`/api/get-user/${params}`)
    
    expect(users.user.id).not.toBeLessThan(0)
    expect(users.user.id).not.toBeGreaterThan(1000)
    expect(users.message.length).not.toBe(0)
  })

  // it('should create new user', async () => {
  //   const newUser = await $fetch('/api/get-user/1', {
  //     method: 'POST',
  //     body: { name: 'John', email: 'john@example.com' }
  //   })
  //   expect(newUser).toHaveProperty('id')
  // })
})