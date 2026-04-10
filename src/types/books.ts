import type { Author } from './authors'

export interface Book {
  id: number
  title: string
  authors: Author[]
  price: number
  plot: string
  published_at: string | null
  collection_id: number
  /** URL copertina se fornito dall'API */
  cover_url?: string | null
  cover?: string | null
  image_url?: string | null
}
