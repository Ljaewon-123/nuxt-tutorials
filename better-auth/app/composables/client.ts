import { magicLinkClient, adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const authClient = createAuthClient({
    baseURL: url.origin,
    fetchOptions: {
      headers
    },
    plugins: [
      magicLinkClient(),
      adminClient()
    ]
  })

  return { authClient }
}


// 잘 알게될때 까지 보류 
