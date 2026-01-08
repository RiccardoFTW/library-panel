<script setup lang="ts">
import type { Book } from '@/types/books'
import dayjs from 'dayjs'
import { icons } from '@/components/icons/icons'

defineProps<{
  book: Book
}>()

const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('DD/MM/YYYY')
}

const formatAuthors = (authors: Book['authors']): string => {
  return authors.map((a) => `${a.firstName} ${a.lastName}`).join(', ')
}

const getAccentColor = (id: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
  ]
  return colors[id % colors.length] || 'bg-blue-500'
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
  >
    <div :class="['w-2 h-12 rounded-full', getAccentColor(book.id)]"></div>

    <div class="flex-1 min-w-0">
      <h3 class="font-semibold text-gray-800 truncate">{{ book.title }}</h3>
      <p class="text-gray-500 text-sm truncate">{{ formatAuthors(book.authors) }}</p>
    </div>

    <div class="text-gray-400 text-sm hidden sm:flex items-center gap-1">
      <span v-html="icons.calendar" class="w-4 h-4"></span>
      {{ formatDate(book.publishedAt) }}
    </div>

    <div class="font-bold text-green-600 text-lg min-w-[70px] text-right">€ {{ book.price }}</div>
  </div>
</template>
