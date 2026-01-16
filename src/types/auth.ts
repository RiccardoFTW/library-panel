export interface AuthResponse {
  data: unknown | null
  msg: string
  errors?: string[]
}

export interface LoginData {
  email: string
  password: string
}

export interface LogoutResponse {
  data: unknown | null
  msg: string
  errors?: string[]
}

export interface SignupData {
  username: string
  email: string
  password: string
}
