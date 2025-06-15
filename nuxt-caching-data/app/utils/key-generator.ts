// utils/keyGenerator.ts

// 음... 잘모르겠군

/**
 * Generate a unique key for useState, useAsyncData, useFetch, etc.
 * 
 * @param scope - Namespace like 'user', 'settings', 'product'
 * @param options - Optional metadata for uniqueness
 */
export const generateKey = (
  scope: string,
  options?: {
    id?: string | number
    component?: string
    feature?: string
  }
): string => {
  const parts = [scope]

  if (options?.feature) parts.push(options.feature)
  if (options?.component) parts.push(options.component)
  if (options?.id !== undefined) parts.push(String(options.id))

  return parts.join(':')
}

/*
import { generateKey } from '@/utils/keyGenerator'

const userId = 42

// For user detail fetch
const key = generateKey('user', { feature: 'detail', id: userId })

const { data: user } = await useAsyncData(key, () => fetchUser(userId))
*/

/*
// For global state
const key = generateKey('auth', { feature: 'session' })
const session = useState(key, () => null)
*/

/*
// For component-local usage
const key = generateKey('product', { feature: 'review', component: 'ProductCard', id: 123 })
const { data } = await useFetch(`/api/product/123/review`, { key })
*/