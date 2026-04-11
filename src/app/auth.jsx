// src/app/auth.jsx
import { createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../db/firebase'
import { logout as logoutFn } from '../db/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth)

  return (
    <AuthContext.Provider value={{ user, loading, logout: logoutFn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}