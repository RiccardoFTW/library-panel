import api, { TOKEN_KEY } from './api'
import type { AuthResponse, LoginData, SignupData } from '../types/auth'

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Chiamata POST al Server
    const response = await api
      .post('/login', loginData)
      .then((res) => {
        console.log('Login response:', res)

        localStorage.setItem(TOKEN_KEY, response.data.access_token)
      })
      .catch((err) => {
        console.error('Login error:', err)
      })

    // Risposta di successo
    return {
      data: response.data,
      msg: 'Login effettuato con successo',
      errors: [],
    }
  } catch (error: unknown) {
    // Risposta di errore
    return {
      data: null,
      msg: 'Errore durante il Login',
      errors: [error instanceof Error ? error.message : 'Errore sconosciuto'],
    }
  }
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
