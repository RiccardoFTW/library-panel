import type { Author } from './authors'

export interface Book {
  id: number
  title: string
  authors: Author[]
  price: number
  plot: string
  published_at: string | null
  collection_id: number
}
