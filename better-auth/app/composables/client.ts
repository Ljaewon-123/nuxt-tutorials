import { magicLinkClient, adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue
import type {
  InferSessionFromClient,
  InferUserFromClient,
  ClientOptions,
} from 'better-auth/client'

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

  const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
  const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)

  // 부작용 조심 해야함 
  const fetchSession = async () => {
    const { data } = await authClient.useSession(useFetch)
    
    // const { data } = await authClient.getSession({
    //   fetchOptions: {
    //     headers,
    //   },
    // })

    session.value = data.value?.session || null
    user.value = data.value?.user || null

    return data;
  }

  // 부작용 매우 조심해야하고 아니면 loggedIn같은 상태 넘기는걸 포기해야함
  fetchSession()

  return { 
    authClient,
    loggedIn: computed(() => !!session.value),
    session,
    user
  }
}


// 잘 알게될때 까지 보류 
