import api, { TOKEN_KEY } from './api'
import type { LoginResponse, LoginData, SignupData, User } from '../types/auth'

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  // L'interceptor in api.ts fa già response.data,
  // quindi 'res' è direttamente { access_token, token_type, expires_in }
  const res = await api.post<unknown, LoginResponse>('/login', loginData)

  localStorage.setItem(TOKEN_KEY, res.access_token)

  return res
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY)
  return !!token
}

export const logout = async (): Promise<void> => {
  try {
    await api.delete('/logout')
  } finally {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export const signup = async (signupData: SignupData): Promise<{ message: string; data: User }> => {
  const res = await api.post<unknown, { message: string; data: User }>('/users', signupData)
  return res
}
