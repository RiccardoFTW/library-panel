import api from './api'

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface ListParams {
  search?: string
  page?: number
  perpage?: number
  [key: string]: unknown
}

export interface BaseServiceInstance<T> {
  getAll: (params?: ListParams) => Promise<PaginatedResponse<T>>
  getOne: (id: number) => Promise<T>
  create: (data: Partial<T>) => Promise<{ data: T }>
  update: (id: number, data: Partial<T>) => Promise<{ data: T }>
  remove: (id: number) => Promise<void>
}

export function createService<T>(resourcePath: string): BaseServiceInstance<T> {
  return {
    getAll: async (params: ListParams = {}) => {
      return api.get<unknown, PaginatedResponse<T>>(resourcePath, { params })
    },

    getOne: async (id: number) => {
      const res = await api.get<unknown, { data: T }>(`${resourcePath}/${id}`)
      return res.data
    },

    create: async (data: Partial<T>) => {
      return api.post<unknown, { data: T }>(resourcePath, data)
    },

    update: async (id: number, data: Partial<T>) => {
      return api.put<unknown, { data: T }>(`${resourcePath}/${id}`, data)
    },

    remove: async (id: number) => {
      await api.delete(`${resourcePath}/${id}`)
    },
  }
}
