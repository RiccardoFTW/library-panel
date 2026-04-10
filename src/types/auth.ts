export interface LoginResponse {
  access_token: string
  token_type: 'bearer'
  expires_in: string
  message?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
  role: 'admin' | 'editor' | 'user'
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string | null
  updated_at: string | null
}
