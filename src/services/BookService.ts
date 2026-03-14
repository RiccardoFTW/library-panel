import { createService } from './BaseService'
import type { Book } from '@/types/books'

export const bookService = createService<Book>('/books')
