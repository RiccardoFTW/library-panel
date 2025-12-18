import axios from 'axios'

// URL del server
const API_URL = 'https://jsonplaceholder.typicode.com'

// Risposta dal server
interface AuthResponse {
  data: any
  msg: string
  errors?: string[]
}

//Dati LOGIN
interface LoginData {
  email: string
  password: string
}

//Dati REGISTRAZIONE
interface SignupData {
  username: string
  email: string
  password: string
}

// Funzione LOGIN
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    //Chiamata POST al Server
    const response = await axios.post(`${API_URL}/users`, loginData)

    // Risposta di successo
    return {
      data: response.data,
      msg: 'Login effettuato con successo',
      errors: [],
    }
  } catch (error: any) {
    // Risposta di errore
    return {
      data: null,
      msg: 'Errore durante il Login',
      errors: [error.response?.data?.message || 'Errore sconosciuto'],
    }
  }
}

// Funzione REGISTRAZIONE
export const signup = async (signupData: SignupData): Promise<AuthResponse> => {
  try {
    //Chiamata POST al Server
    const response = await axios.post(`${API_URL}/users`, signupData)

    // Risposta di successo
    return {
      data: response.data,
      msg: 'Registrazione completata con successo',
      errors: [],
    }
  } catch (error: any) {
    // Risposta di errore
    return {
      data: null,
      msg: 'Errore durante la registrazione',
      errors: [error.response?.data?.message || 'Errore sconosciuto'],
    }
  }
}
