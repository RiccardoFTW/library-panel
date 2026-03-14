import api from './api'
import { getToken, setToken, removeToken } from './cookies'
import type { LoginResponse, LoginData, SignupData, User } from '../types/auth'

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const res = await api.post<unknown, LoginResponse>('/login', loginData)
  setToken(res.access_token)
  return res
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}

export const logout = async (): Promise<void> => {
  try {
    await api.delete('/logout')
  } finally {
    removeToken()
  }
}

export const signup = async (signupData: SignupData): Promise<{ message: string; data: User }> => {
  const res = await api.post<unknown, { message: string; data: User }>('/users', signupData)
  return res
}

export const getMe = async (): Promise<User> => {
  const res = await api.get<unknown, { data: User }>('/me')
  return res.data
}
