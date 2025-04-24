// plugins/opossum.client.ts
import { defineNuxtPlugin } from '#app'
import CircuitBreaker from 'opossum'

export default defineNuxtPlugin(() => {
  const breakerMap = new Map<string, CircuitBreaker>()

  const useBreaker = (name: string, action: () => Promise<any>, options = {}) => {
    if (!breakerMap.has(name)) {
      const breaker = new CircuitBreaker(action, {
        timeout: 2000, // 요청 제한 시간
        errorThresholdPercentage: 50, // 실패율 임계치
        resetTimeout: 5000, // 재시도 시간
        ...options,
      })
      breakerMap.set(name, breaker)
    }
    return breakerMap.get(name)!
  }

  return {
    provide: {
      breaker: useBreaker,
    },
  }
})
