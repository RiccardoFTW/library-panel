<script setup lang="ts">
import type { Book } from '@/types/books'
import dayjs from 'dayjs'
import { icons } from '@/components/icons/icons'

defineProps<{
  book: Book
}>()

// Date
const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('DD/MM/YYYY')
}

const formatAuthors = (authors: Book['authors']): string => {
  return authors.map((a) => `${a.firstName} ${a.lastName}`).join(', ')
}

const getPlaceholderColor = (id: number): string => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-teal-400 to-teal-600',
    'from-indigo-400 to-indigo-600',
    'from-red-400 to-red-600',
  ]
  return colors[id % colors.length] || 'from-blue-400 to-blue-600'
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition-shadow"
  >
    <div
      :class="[
        'h-32 bg-linear-to-br flex items-center justify-center text-white',
        getPlaceholderColor(book.id),
      ]"
    >
      <span v-html="icons.book" class="w-12 h-12"></span>
    </div>

    <!-- Contenuto -->
    <div class="p-5 flex flex-col flex-1">
      <h2 class="text-lg font-semibold text-gray-800 line-clamp-2">
        {{ book.title }}
      </h2>
      <p class="text-gray-500 text-sm mt-2 flex-1">
        {{ formatAuthors(book.authors) }}
      </p>

      <!-- Footer -->
      <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span class="text-gray-400 text-sm flex items-center gap-1">
          <span v-html="icons.calendar" class="w-4 h-4"></span>
          {{ formatDate(book.publishedAt) }}
        </span>
        <span class="font-bold text-green-600 text-lg">€ {{ book.price }}</span>
      </div>
    </div>
  </div>
</template>
