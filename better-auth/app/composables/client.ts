import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const authClient = createAuthClient({
    //you can pass client configuration here
    baseURL: url.origin,
    fetchOptions: {
      headers,
    },
  })

  return { authClient }
}

// 잘 알게될때 까지 보류 