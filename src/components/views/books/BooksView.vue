<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { bookService } from '@/services/BookService'
import { icons } from '@/components/icons/icons'
import { SEARCH_DEBOUNCE_MS } from '@/constants/search'

const { items: books, meta, loading, error: errorMsg, fetchAll } = useApi(bookService)

const viewMode = ref('card')
const viewOptions = [
  { value: 'card', label: 'Card', icon: icons.grid },
  { value: 'list', label: 'Lista', icon: icons.list },
]

const currentPage = ref(1)
const search = ref('')

const loadBooks = () => {
  fetchAll({
    page: currentPage.value,
    perpage: 30,
    search: search.value,
  })
}

const onPageChange = (page: number) => {
  currentPage.value = page
  loadBooks()
}

const onSearch = (query: string) => {
  search.value = query
}

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

watch(search, () => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    searchDebounceTimer = null
    currentPage.value = 1
    loadBooks()
  }, SEARCH_DEBOUNCE_MS)
})

onBeforeUnmount(() => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
})

loadBooks()
</script>

<template>
  <div class="catalog-view">
    <div class="catalog-view__toolbar">
      <div class="catalog-view__heading">
        <h1 class="catalog-view__title">Catalogo</h1>
        <p v-if="meta" class="catalog-view__meta">
          Totale libri: <strong>{{ meta.total }}</strong>
        </p>
      </div>
      <ListSearch :model-value="search" placeholder="Cerca..." @search="onSearch" />
    </div>

    <div v-if="errorMsg" class="catalog-view__alert">
      {{ errorMsg }}
    </div>

    <div class="catalog-view__controls">
      <ButtonGroup v-model="viewMode" :options="viewOptions" />
    </div>

    <div v-if="!loading && viewMode === 'card'" class="catalog-view__grid">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>

    <div v-if="!loading && viewMode === 'list'" class="catalog-view__list">
      <BookListItem v-for="book in books" :key="book.id" :book="book" />
    </div>

    <ListPagination
      v-if="meta && meta.last_page > 1"
      :current-page="currentPage"
      :last-page="meta.last_page"
      @change-page="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.catalog-view {
  padding: var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-5) var(--space-6);
  }

  &__toolbar {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-5);

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
    }
  }

  &__heading {
    display: grid;
    gap: var(--space-1);
  }

  &__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.28rem, 2.6vw, 1.45rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: var(--lh-tight);
    color: var(--text-primary);
  }

  &__meta {
    margin: 0;
    font-size: 0.75rem;
    line-height: var(--lh-snug);
    color: var(--text-muted);

    strong {
      color: var(--text-secondary);
      font-weight: 600;
    }
  }

  &__alert {
    margin-bottom: var(--space-5);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-control);
    border: 1px solid #eccccc;
    background: var(--danger-soft);
    font-size: 0.8125rem;
    line-height: var(--lh-snug);
    color: var(--danger);
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--space-5);
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
}
</style>
