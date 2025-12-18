import type { Author } from './authors'

export interface Book {
  id: number
  title: string
  authors: Author[]
  price: number
  publishedAt: Date
}
