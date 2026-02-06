import api, { TOKEN_KEY } from './api'
import type { AuthResponse, LoginData, LogoutResponse, SignupData } from '../types/auth'

export const login = async (loginData: LoginData): Promise<AuthResponse | void> => {
  // Chiamata POST al Server
  return await api
    .post('/login', loginData)
    .then((res) => {
      console.log('Login response:', res)

      localStorage.setItem(TOKEN_KEY, res.data.access_token)
    })
    .catch((err: Error) => {
      throw err
    })
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY)
  return !!token
}

export const logout = async (): Promise<LogoutResponse | void> => {
  // Chiamata POST al Server
  return await api
    .delete('/logout')
    .then((res) => {
      console.log('Logout response:', res)
    })
    .catch((err: unknown) => {
      throw err
    })
    .finally(() => {
      localStorage.removeItem(TOKEN_KEY)
    })
}

// Funzione REGISTRAZIONE
export const signup = async (signupData: SignupData): Promise<AuthResponse> => {
  try {
    // Chiamata POST al Server
    const response = await api.post('/users', signupData)

    // Risposta di successo
    return {
      data: response.data,
      msg: 'Registrazione completata con successo',
      errors: [],
    }
  } catch (error: unknown) {
    // Risposta di errore
    return {
      data: null,
      msg: 'Errore durante la registrazione',
      errors: [error instanceof Error ? error.message : 'Errore sconosciuto'],
    }
  }
}
