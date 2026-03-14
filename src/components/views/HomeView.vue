<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { bookService } from '@/services/BookService'
import { icons } from '@/components/icons/icons'

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
  currentPage.value = 1
  loadBooks()
}

loadBooks()
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Catalogo Libri</h1>
      <ListSearch :model-value="search" placeholder="Cerca..." @search="onSearch" />
    </div>

    <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
      {{ errorMsg }}
    </div>

    <div class="mb-6 flex justify-end">
      <ButtonGroup v-model="viewMode" :options="viewOptions" />
    </div>

    <!-- Card -->
    <div v-if="!loading && viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>

    <!-- List -->
    <div v-if="!loading && viewMode === 'list'" class="space-y-3">
      <BookListItem v-for="book in books" :key="book.id" :book="book" />
    </div>

    <!-- Pagination -->
    <ListPagination v-if="meta && meta.last_page > 1" :current-page="currentPage" :last-page="meta.last_page"
      @change-page="onPageChange" />
  </div>
</template>
