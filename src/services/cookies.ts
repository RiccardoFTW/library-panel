import Cookies from 'universal-cookie'

export const TOKEN_KEY = 'auth_token'

const cookies = new Cookies()

export function getToken(): string | undefined {
  return cookies.get(TOKEN_KEY)
}

export function setToken(token: string): void {
  cookies.set(TOKEN_KEY, token, { path: '/' })
}

export function removeToken(): void {
  cookies.remove(TOKEN_KEY, { path: '/' })
}
