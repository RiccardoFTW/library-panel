import booksData from '@/data/books.json'
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

// Funzione per simulare chiamata API
export const getBooks = (params: GetBooksParams = {}): PaginatedResponse<Book> => {
  const { search = '', page = 1, perpage = 10 } = params

  let books = booksData.data as Book[]

  if (search) {
    const searchLower = search.toLowerCase()
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.authors.some((author) =>
          `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchLower),
        ),
    )
  }

  // Calcolo paginazione
  const total = books.length
  const lastPage = Math.ceil(total / perpage)
  const start = (page - 1) * perpage
  const paginatedBooks = books.slice(start, start + perpage)

  return {
    data: paginatedBooks,
    meta: {
      current_page: page,
      last_page: lastPage,
      per_page: perpage,
      total: total,
    },
  }
}
