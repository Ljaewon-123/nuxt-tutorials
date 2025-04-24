// // /composables/useCircuitFetch.ts
// import CircuitBreaker from 'opossum'

// type Options = {
//   timeout?: number
//   errorThresholdPercentage?: number
//   resetTimeout?: number
// }

// const breakerMap = new Map<string, CircuitBreaker>()

// function createBreaker(action: () => Promise<any>, options?: Options): CircuitBreaker {
//   const breaker = new CircuitBreaker(
//     action,
//     {
//       timeout: 2000,
//       errorThresholdPercentage: 50,
//       resetTimeout: 5000,
//       ...options,
//     },
//   )
//   return breaker
// }

// export function useCircuitFetch() {
//   function getBreaker(endpoint: string, options?: Options) {
//     if (!breakerMap.has(endpoint)) {
//       breakerMap.set(endpoint, createBreaker(endpoint, options))
//     }
//     return breakerMap.get(endpoint)!
//   }

//   function getState(endpoint: string): 'OPEN' | 'CLOSED' | 'HALF_OPEN' | 'UNKNOWN' {
//     const breaker = breakerMap.get(endpoint)
//     if (!breaker) return 'UNKNOWN'
//     if (breaker.opened) return 'OPEN'
//     if (breaker.halfOpen) return 'HALF_OPEN'
//     if (breaker.closed) return 'CLOSED'
//     return 'UNKNOWN'
//   }

//   return {
//     getBreaker,
//     getState,
//   }
// }
