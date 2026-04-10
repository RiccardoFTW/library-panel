import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getToken, removeToken } from './cookies'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export interface ApiError {
  error: string
  errors?: Record<string, string>
  message?: string
}

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,

  // Stampa il messaggio di success qui in modo che sia centralizzato per tutti i form che fanno chiamate verso l'api

  (error: AxiosError<ApiError>) => {
    const requestUrl = error.config?.url ?? ''
    const isAuthRequest = requestUrl.includes('/login') || requestUrl.includes('/logout')

    if (error.response?.status === 401 && !isAuthRequest) {
      removeToken()
      if (typeof window !== 'undefined' && !['/login', '/register'].includes(window.location?.pathname)) {
        window.location.href = '/login'
      }
    } else if (error.response?.status === 422) {
      console.error('Validation error:', error.response.data)
      // Stampa errori di validazione specifici per ogni campo, se presenti + messaggio generico di errore
    }
    console.log('API error:', error)
    return Promise.reject(error.response?.data ?? { error: 'Network error' })
  },
)

export default api
