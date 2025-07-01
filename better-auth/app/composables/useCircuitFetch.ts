import CircuitBreaker from 'opossum'

export const useCircuitBreaker = (action: () => Promise<any>, options = {}) => {
  const breaker = new CircuitBreaker(action, {
    timeout: 2000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
    ...options,
  })

  // 컴포넌트가 언마운트될 때 자동 정리
  onBeforeUnmount(() => {
    // opossum의 경우 명시적 destroy가 없지만 참조 해제
    breaker.removeAllListeners()
  })

  return {
    fire: () => breaker.fire(),
    breaker,
    get stats() { return breaker.stats },
    get isOpen() { return breaker.opened },
    get isHalfOpen() { return breaker.halfOpen },
    get isClosed() { return breaker.closed },
  }
}


// const { fire, stats, isOpen } = useCircuitBreaker(
//   () => $fetch('/api/circuit/hello')
// )

// const callApi = async () => {
//   try {
//     const res = await fire()
//     result.value = res.message
//   } catch (err) {
//     // 에러 처리
//   }
// }
