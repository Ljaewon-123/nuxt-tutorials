import { createAuthClient } from "better-auth/vue" 

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: 'http://localhost:3000',
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",   
    },
  },
})