import { createAuthClient } from "better-auth/vue" 
import { twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: 'http://localhost:3000',
  fetchOptions: {
    headers: {
      
    },
  },
  plugins: [
    twoFactorClient()
  ]
})