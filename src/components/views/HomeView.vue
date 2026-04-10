<script setup lang="ts">
import { bookService } from '@/services/BookService'
import { createService } from '@/services/BaseService'
import { SEARCH_DEBOUNCE_MS } from '@/constants/search'

const router = useRouter()

const query = ref('')
const searching = ref(false)
const searchFeedback = ref('')

const statsLoading = ref(true)
const stats = reactive({
  books: 0,
  authors: 0,
  collections: 0,
  users: 0,
})

const fetchTotal = async (resource: string): Promise<number> => {
  const service = createService<unknown>(resource)
  const response = await service.getAll({ page: 1, perpage: 1 })
  return Number(response.meta?.total ?? 0)
}

const loadStats = async () => {
  statsLoading.value = true
  try {
    const [books, authors, collections, users] = await Promise.all([
      fetchTotal('/books'),
      fetchTotal('/authors'),
      fetchTotal('/collections'),
      fetchTotal('/users'),
    ])

    stats.books = books
    stats.authors = authors
    stats.collections = collections
    stats.users = users
  } finally {
    statsLoading.value = false
  }
}

let feedbackClearTimer: ReturnType<typeof setTimeout> | null = null

/** Dopo una pausa in digitazione, nasconde il messaggio di errore (stesso intervallo del catalogo). */
const scheduleClearFeedback = () => {
  if (feedbackClearTimer) clearTimeout(feedbackClearTimer)
  feedbackClearTimer = setTimeout(() => {
    feedbackClearTimer = null
    searchFeedback.value = ''
  }, SEARCH_DEBOUNCE_MS)
}

const handleSearch = async () => {
  const search = query.value.trim()
  if (!search || searching.value) return

  if (feedbackClearTimer) {
    clearTimeout(feedbackClearTimer)
    feedbackClearTimer = null
  }

  searching.value = true
  searchFeedback.value = ''

  try {
    const response = await bookService.getAll({ search, page: 1, perpage: 1 })
    const firstBook = response.data[0] as { id?: number } | undefined

    if (!firstBook?.id) {
      searchFeedback.value = 'Nessun libro trovato.'
      return
    }

    await router.push({ name: 'books.show', params: { id: firstBook.id } })
  } catch {
    searchFeedback.value = 'Ricerca non disponibile al momento.'
  } finally {
    searching.value = false
  }
}

onBeforeUnmount(() => {
  if (feedbackClearTimer) clearTimeout(feedbackClearTimer)
})

loadStats()
</script>

<template>
  <section class="home-hub">
    <div class="home-hub__panel">
      <p class="home-hub__eyebrow">Home</p>
      <h1 class="home-hub__title">Cerca subito un libro</h1>

      <form class="home-hub__search" @submit.prevent="handleSearch">
        <input
          v-model="query"
          type="text"
          placeholder="Titolo, autore, parola chiave..."
          class="home-hub__input"
          @input="scheduleClearFeedback"
        />
        <button type="submit" class="home-hub__button" :disabled="searching">
          {{ searching ? 'Ricerca...' : 'Cerca' }}
        </button>
      </form>

      <p v-if="searchFeedback" class="home-hub__feedback">
        {{ searchFeedback }}
      </p>

      <div class="home-hub__stats" :class="{ 'home-hub__stats--loading': statsLoading }">
        <span
          >Libri: <strong>{{ stats.books }}</strong></span
        >
        <span
          >Autori: <strong>{{ stats.authors }}</strong></span
        >
        <span
          >Collezioni: <strong>{{ stats.collections }}</strong></span
        >
        <span
          >Utenti: <strong>{{ stats.users }}</strong></span
        >
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hub {
  min-height: calc(100vh - 7rem);
  display: grid;
  place-items: center;
  padding: var(--space-5) var(--space-4);

  &__panel {
    width: min(100%, 680px);
  }

  &__eyebrow {
    margin: 0 0 var(--space-2);
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  &__title {
    margin: 0 0 var(--space-4);
    font-family: var(--font-display);
    font-size: clamp(1.65rem, 5.2vw, 2.35rem);
    line-height: var(--lh-tight);
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  &__search {
    display: flex;
    gap: var(--space-2);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-card);
    background: var(--surface-card);
    padding: var(--space-2);
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.875rem;
    line-height: var(--lh-snug);
    padding: var(--space-2) var(--space-3);

    &::placeholder {
      color: var(--text-muted);
    }
  }

  &__button {
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-control);
    background: var(--surface-muted);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.8rem;
    line-height: var(--lh-snug);
    padding: var(--space-2) var(--space-4);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--accent-primary-hover);
      color: var(--surface-card);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__feedback {
    margin: var(--space-2) 0 0;
    font-size: 0.75rem;
    color: var(--danger);
  }

  &__stats {
    margin-top: var(--space-3);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    font-size: 0.72rem;
    line-height: var(--lh-snug);
    color: var(--text-muted);

    strong {
      color: var(--text-secondary);
      font-weight: 600;
    }

    &--loading {
      opacity: 0.65;
    }
  }
}
</style>
