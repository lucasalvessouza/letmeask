import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User as UserFirebase } from "firebase/auth"
import { createContext, useEffect, useState, ReactNode } from "react"

type User = {
    id: string
    name: string
    avatar: string
}

type AuthContextType = {
    user?: User | undefined
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user)
        return
      }
      resetUser()
    })

    return () => {
        unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider)
    if (result.user) {
      setUserState(result.user)
    }
  }

  async function logout() {
    const auth = getAuth();
    await auth.signOut();
  }

  function setUserState(user: UserFirebase) {
    const { uid, displayName, photoURL } = user
    if (!displayName || !photoURL) {
      throw new Error('Missing information from Google account')
    }
    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    })
  }

  function resetUser() {
    setUser(undefined)
  }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}