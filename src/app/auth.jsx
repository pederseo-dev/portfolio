import { createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './fireBase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth)

  async function logout() {
    await auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}