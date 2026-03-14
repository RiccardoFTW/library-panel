import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth_store'
import type { LoginData, SignupData } from '@/types/auth'

export function useAuth() {
  const store = useAuthStore()
  const { user, isAuthenticated } = storeToRefs(store)

  const login = (loginData: LoginData) => store.login(loginData)
  const logout = () => store.logout()
  const signup = (signupData: SignupData) => store.signup(signupData)
  const fetchUser = () => store.fetchUser()

  return { user, isAuthenticated, login, logout, signup, fetchUser }
}
