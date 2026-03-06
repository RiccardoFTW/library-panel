import api from './api'
import type { Book } from '@/types/books'

export interface GetBooksParams {
  search?: string
  page?: number
  perpage?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export const getBooks = async (
  params: GetBooksParams = {},
): Promise<PaginatedResponse<Book>> => {
  const res = await api.get<unknown, PaginatedResponse<Book>>('/books', { params })
  return res
}

export const getBook = async (id: number): Promise<Book> => {
  const res = await api.get<unknown, { data: Book }>(`/books/${id}`)
  return res.data
}
