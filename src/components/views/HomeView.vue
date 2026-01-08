<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getBooks, type PaginatedResponse } from '@/services/BookService'
import type { Book } from '@/types/books'
import ButtonGroup from '@/components/atoms/ButtonGroup.vue'
import BooksPagination from '../atoms/BooksPagination.vue'
import BookCard from '@/components/molecules/BookCard.vue'
import BookListItem from '@/components/molecules/BookListItem.vue'
import { icons } from '@/components/icons/icons'

const books = ref<Book[]>([])
const meta = ref<PaginatedResponse<Book>['meta'] | null>(null)
const loading = ref(false)
const search = ref('')
const viewMode = ref('card')
const viewOptions = [
  { value: 'card', label: 'Card', icon: icons.grid },
  { value: 'list', label: 'Lista', icon: icons.list },
]
const currentPage = ref(1)

const loadBooks = () => {
  loading.value = true
  const response = getBooks({ page: currentPage.value, perpage: 3, search: search.value })
  books.value = response.data
  meta.value = response.meta
  loading.value = false
}

// Watch
watch(search, () => {
  currentPage.value = 1
  loadBooks()
})
watch(currentPage, () => {
  loadBooks()
})

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Catalogo Libri</h1>
      <input
        v-model="search"
        type="text"
        placeholder="Cerca..."
        class="w-64 px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
    </div>

    <div class="mb-6 flex justify-end">
      <ButtonGroup v-model="viewMode" :options="viewOptions" />
    </div>

    <!-- Card -->
    <div
      v-if="!loading && viewMode === 'card'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>

    <!-- List -->
    <div v-if="!loading && viewMode === 'list'" class="space-y-3">
      <BookListItem v-for="book in books" :key="book.id" :book="book" />
    </div>

    <!-- Pagination -->
    <BooksPagination
      v-if="meta && meta.last_page"
      v-model:currentPage="currentPage"
      :lastPage="meta.last_page"
    />
  </div>
</template>
