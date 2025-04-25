import { createAuthClient } from "better-auth/vue" 
import { magicLinkClient, twoFactorClient } from "better-auth/client/plugins"

const url = useRequestURL()
const headers = import.meta.server ? useRequestHeaders() : undefined
export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: url.origin,
  fetchOptions: {
    headers
  },
  plugins: [
    // twoFactorClient()
    magicLinkClient()
  ]
})