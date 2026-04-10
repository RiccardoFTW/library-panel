<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { bookService } from '@/services/BookService'
import type { Book } from '@/types/books'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()

const { item: book, loading, error, fetchOne } = useApi(bookService)

const bookId = computed(() => Number(route.params.id))

const coverGradients = [
  'linear-gradient(155deg, #8bb6da 0%, #5b94c3 100%)',
  'linear-gradient(155deg, #9db8d2 0%, #718fb0 100%)',
  'linear-gradient(155deg, #84a7c5 0%, #6889a8 100%)',
  'linear-gradient(155deg, #a8bfd8 0%, #7698b8 100%)',
] as const

const coverUrl = computed(() => {
  if (!book.value) return null
  const b = book.value
  const raw = (b.cover_url ?? b.cover ?? b.image_url ?? '').trim()
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  const base = import.meta.env.VITE_API_URL as string | undefined
  if (raw.startsWith('/') && base) {
    try {
      const origin = new URL(base).origin
      return `${origin}${raw}`
    } catch {
      return raw
    }
  }
  return raw
})

const coverGradient = computed(() => {
  const id = book.value?.id ?? 0
  return coverGradients[id % coverGradients.length]
})

const bookInitials = computed(() => {
  const title = book.value?.title?.trim() ?? ''
  const words = title.split(/\s+/).slice(0, 2)
  return words.map((word) => word[0]?.toUpperCase() ?? '').join('') || 'BK'
})

const authorNames = computed(() => {
  if (!book.value?.authors?.length) return '-'
  return book.value.authors
    .map((author) => `${author.first_name ?? ''} ${author.last_name ?? ''}`.trim())
    .filter(Boolean)
    .join(', ')
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

const formatDate = (date: string | null): string => {
  if (!date) return '-'
  return dayjs(date).format('DD/MM/YYYY')
}

const loadBook = async () => {
  if (!Number.isFinite(bookId.value)) return
  await fetchOne(bookId.value)
}

watch(bookId, loadBook, { immediate: true })
</script>

<template>
  <section class="book-detail">
    <div class="book-detail__topbar">
      <button type="button" class="book-detail__back" @click="router.push({ name: 'catalog' })">
        Torna al catalogo
      </button>
    </div>

    <div v-if="loading" class="book-detail__state">Caricamento libro...</div>
    <div v-else-if="error" class="book-detail__error">{{ error }}</div>

    <article v-else-if="book" class="book-detail__card">
      <div class="book-detail__hero">
        <figure class="book-detail__cover">
          <img
            v-if="coverUrl"
            :src="coverUrl"
            :alt="`Copertina di ${(book as Book).title}`"
            class="book-detail__cover-img"
            loading="lazy"
          />
          <div
            v-else
            class="book-detail__cover-placeholder"
            :style="{ background: coverGradient }"
            aria-hidden="true"
          >
            <span class="book-detail__cover-initials">{{ bookInitials }}</span>
          </div>
        </figure>

        <div class="book-detail__content">
          <header class="book-detail__header">
            <p class="book-detail__eyebrow">Scheda libro</p>
            <h1 class="book-detail__title">{{ (book as Book).title }}</h1>
            <p class="book-detail__authors">{{ authorNames }}</p>
          </header>

          <div class="book-detail__grid">
            <div class="book-detail__meta-item">
              <span class="book-detail__label">Prezzo</span>
              <strong>EUR {{ formatPrice((book as Book).price) }}</strong>
            </div>
            <div class="book-detail__meta-item">
              <span class="book-detail__label">Pubblicato</span>
              <strong>{{ formatDate((book as Book).published_at) }}</strong>
            </div>
            <div class="book-detail__meta-item">
              <span class="book-detail__label">ID libro</span>
              <strong>#{{ (book as Book).id }}</strong>
            </div>
            <div class="book-detail__meta-item">
              <span class="book-detail__label">Collezione</span>
              <strong>{{ (book as Book).collection_id }}</strong>
            </div>
          </div>
        </div>
      </div>

      <section class="book-detail__plot">
        <h2>Descrizione</h2>
        <p>{{ (book as Book).plot || 'Nessuna descrizione disponibile.' }}</p>
      </section>
    </article>
  </section>
</template>

<style scoped lang="scss">
.book-detail {
  padding: var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-5) var(--space-6);
  }

  &__topbar {
    margin-bottom: var(--space-4);
  }

  &__back {
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-control);
    background: var(--surface-card);
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.78rem;
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
  }

  &__state {
    color: var(--text-muted);
    font-size: 0.82rem;
  }

  &__error {
    border: 1px solid #eccccc;
    background: var(--danger-soft);
    color: var(--danger);
    border-radius: var(--radius-control);
    padding: var(--space-3) var(--space-4);
    font-size: 0.82rem;
  }

  &__card {
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-card);
    background: var(--surface-card);
    padding: var(--space-5);
    display: grid;
    gap: var(--space-5);
  }

  &__hero {
    display: grid;
    gap: var(--space-4);
    align-items: start;

    @media (min-width: 640px) {
      grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
      gap: var(--space-5);
      align-items: stretch;
    }
  }

  &__content {
    display: grid;
    gap: var(--space-4);
    min-width: 0;

    @media (min-width: 640px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0;
      min-height: 0;
    }
  }

  &__cover {
    margin: 0;
    border-radius: var(--radius-control);
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    aspect-ratio: 2 / 3;
    max-width: 200px;
    background: var(--surface-muted);

    @media (min-width: 640px) {
      align-self: start;
    }
  }

  &__cover-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &__cover-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 12rem;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.28), transparent 44%);
      pointer-events: none;
    }
  }

  &__cover-initials {
    position: relative;
    z-index: 1;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #fff;
  }

  &__header {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
  }

  &__eyebrow {
    margin: 0;
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  &__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3vw, 1.7rem);
    line-height: var(--lh-tight);
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  &__authors {
    margin: 0;
    font-size: 0.86rem;
    color: var(--text-secondary);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: var(--space-3);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__meta-item {
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-control);
    background: var(--surface-page);
    padding: var(--space-3);
    display: grid;
    gap: var(--space-1);

    strong {
      font-size: 0.88rem;
      color: var(--text-primary);
      font-weight: 600;
    }
  }

  &__label {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  &__plot {
    display: grid;
    gap: var(--space-2);

    h2 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 1.02rem;
      color: var(--text-primary);
    }

    p {
      margin: 0;
      font-size: 0.84rem;
      line-height: var(--lh-body);
      color: var(--text-secondary);
    }
  }
}
</style>
