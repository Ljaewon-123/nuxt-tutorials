import { createAuthClient } from "better-auth/vue" 
import { magicLinkClient, adminClient, inferAdditionalFields } from "better-auth/client/plugins"

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
    adminClient(),
    inferAdditionalFields<typeof auth>()
    // inferAdditionalFields({
    //   user: {
    //     meta: {
    //       type: "string",         // `jsonb`로 사용
    //       required: false,      // null 허용
    //       defaultValue: null,   // 명시적으로 null 기본값
    //     },
    //   }
    // })
  ]
})