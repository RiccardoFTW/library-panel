import axios from 'axios'
import type { AuthResponse, LoginData, SignupData } from '../types/auth'

// URL del server
const API_URL = import.meta.env.VITE_API_URL // Spostare in .env SUBITO!

// Funzione LOGIN
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Chiamata POST al Server
    const response = await axios.post(`${API_URL}/users`, loginData)

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
    const response = await axios.post(`${API_URL}/users`, signupData)

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
