import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// Chiave
export const TOKEN_KEY = 'auth_token'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* INTERCEPTOR*/
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse) => response.data, // Da verificare quando il Server risponde con dati 200 / 201

  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      if (typeof window !== 'undefined' && window.location?.pathname !== '/login') {
        window.location.href = '/login'
      }
    } else if (error.response?.status === 422) {
      console.error('Validation error:', error.response.data)
    }
    console.log('API error:', error)
    return Promise.reject(error.response.data)
  },
)

export default api
