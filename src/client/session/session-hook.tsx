import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { CognitoAccessToken } from 'amazon-cognito-identity-js';
import { Session } from "@/common/session"

interface SessionState{
  loading: boolean
  session: Session | null

  refresh(): void
}

const loadingState = {
  loading: true,
  session: null,
  refresh() {},
}

const TokenContext = createContext<SessionState>(null!)

export function SessionProvider({ children }: { children: ReactNode }): ReactNode {
  const [state, setState] = useState<SessionState>({
    loading: true,
    session: null,
    refresh() {},
  })

  const refresh = useCallback(() => {
    const token = getCookie("_token")
    if (!token) {
      setState({ loading: false, session: null, refresh })
      return
    }
    //sessionを保存
    const accessToken = new CognitoAccessToken({AccessToken: token})
    const payload = accessToken.payload as Session
    setState({ loading: false, session: payload, refresh })
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return <TokenContext.Provider value={state}>{children}</TokenContext.Provider>
}

export function useSession(): SessionState{
  const router = useRouter()
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }

  if (context.loading) {
    return loadingState
  }

  if (!context.session || context.session.exp * 1000 < Date.now()) {
    if (router.pathname !== "/login") {
      router.push("/login").catch((e) => console.error(e))
    }
    return { ...loadingState, refresh: context.refresh }
  }

  return context
}
