import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clearUserSession, getUserSession, loginWithMockCredentials, setUserSession } from '../services/authService'
import type { AppUser } from '../types'

interface AuthContextValue {
  user: AppUser | null
  isAuthenticated: boolean
  login: (identifier: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null)

  useEffect(() => {
    const sessionUser = getUserSession()
    if (sessionUser) {
      setUser(sessionUser)
    }
  }, [])

  const login = async (identifier: string, password: string) => {
    const authenticatedUser = loginWithMockCredentials(identifier, password)

    if (!authenticatedUser) {
      return false
    }

    setUser(authenticatedUser)
    setUserSession(authenticatedUser)
    return true
  }

  const logout = () => {
    clearUserSession()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
