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
  // const fetchSession = async () => {
  //   const { data } = await authClient.useSession(useFetch)
    
  //   // const { data } = await authClient.getSession({
  //   //   fetchOptions: {
  //   //     headers,
  //   //   },
  //   // })

  //   session.value = data.value?.session || null
  //   user.value = data.value?.user || null

  //   return data;
  // }

  const fetchSession = async () => {
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers,
      },
    })
    session.value = data?.session || null
    user.value = data?.user || null
    console.log('session.value', session.value, data?.session)
    return data
  }

  // 부작용 매우 조심해야하고 아니면 loggedIn같은 상태 넘기는걸 포기해야함
  // %%%%%%%% 이미 라우터 인증을 위한 미들웨어를 사용하는 페이지면 이미 2번 페칭하기때문에 다른방법 고려 
  // fetchSession()

  // 모든 기기 세션 때문에 이거 안되는거 같음 
  if (import.meta.client) {
    authClient.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return
      await fetchSession()
    })
  }

  return { 
    authClient,
    loggedIn: computed(() => !!session.value),
    session,
    user,
    fetchSession
  }
}


// 잘 알게될때 까지 보류 
