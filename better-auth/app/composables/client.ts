import { magicLinkClient, adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue
import type {
  InferSessionFromClient,
  InferUserFromClient,
  ClientOptions,
} from 'better-auth/client'
import type { UserAuth } from "./types/user.interface"

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
  const user = useState<UserAuth | null>('auth:user', () => null)

  // 부작용 조심 해야함 
  const fetchSession = async () => {
    const { data } = await authClient.useSession(useFetch)

    session.value = data.value?.session || null
    user.value = data.value?.user || null

    return data;
  }

  // 부작용 매우 조심해야하고 아니면 loggedIn같은 상태 넘기는걸 포기해야함
  // %%%%%%%% 이미 라우터 인증을 위한 미들웨어를 사용하는 페이지면 이미 2번 페칭하기때문에 다른방법 고려 
  // 로그 아웃까지는 여기에 포함하는거 생각 해보자
  // 현재 세션이 남아있는지 정확하게 확인할 무언가
  if(session.value === null) { // 흠...
    fetchSession()
  }

  return { 
    authClient,
    isLoggedIn: computed(() => !!session.value),
    session,
    user,
    fetchSession,
    logout:() => authClient.signOut()
  }
}


// 잘 알게될때 까지 보류 
