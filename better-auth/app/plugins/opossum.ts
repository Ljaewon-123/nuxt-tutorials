import { defineNuxtPlugin } from '#app'
import CircuitBreaker from 'opossum'

export default defineNuxtPlugin(() => {
  const breakerMap = new Map<string, CircuitBreaker>()

  const useBreaker = (name: string, action: () => Promise<any>, options = {}) => {
    if (!breakerMap.has(name)) {
      const breaker = new CircuitBreaker(action, {
        timeout: 2000,
        errorThresholdPercentage: 50,
        resetTimeout: 5000,
        ...options,
      })
      breakerMap.set(name, breaker)
    }
    
    const breaker = breakerMap.get(name)!
    
    // fire()를 자동으로 호출하는 래퍼 함수 반환
    return {
      // 기존 breaker 객체도 접근 가능하게 (상태 확인 등을 위해)
      breaker,
      // 간편한 실행 함수
      execute: () => breaker.fire(),
      // 상태 정보들
      get stats() { return breaker.stats },
      get isOpen() { return breaker.opened },
      get isHalfOpen() { return breaker.halfOpen },
      get isClosed() { return breaker.closed },
    }
  }

  // 가장 간단한 헬퍼 함수 - 원하신 형태
  const callWithBreaker = async (name: string, action: () => Promise<any>, options = {}) => {
    const { execute } = useBreaker(name, action, options)
    return await execute()
  }

  return {
    provide: {
      breaker: useBreaker,
      callWithBreaker,
    },
  }
})