import { createAuthClient } from "better-auth/vue" 
import { magicLinkClient, adminClient } from "better-auth/client/plugins"

// const url = useRequestURL()
// const headers = import.meta.server ? useRequestHeaders() : undefined
export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: 'http://localhost:3000',
  fetchOptions: {
    headers: {
      
    },
  },
  plugins: [
    // twoFactorClient()
    magicLinkClient(),
    adminClient()
  ]
})