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
  if (!authors?.length) return '-'
  return authors
    .map((a) => `${a.first_name ?? ''} ${a.last_name ?? ''}`.trim())
    .filter(Boolean)
    .join(', ')
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

const getAccentColor = (id: number): string => {
  const colors = [
    'bg-[#6f9fc5]',
    'bg-[#84a8c8]',
    'bg-[#7ea0c0]',
    'bg-[#89acca]',
  ]
  return colors[id % colors.length] || 'bg-[#6f9fc5]'
}
</script>

<template>
  <RouterLink
    :to="{ name: 'books.show', params: { id: book.id } }"
    class="flex items-center gap-4 rounded-xl border border-(--border-subtle) bg-(--surface-card) px-4 py-3 text-inherit no-underline shadow-[0_3px_12px_rgba(32,38,45,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_22px_rgba(32,38,45,0.1)]"
    :aria-label="`Apri scheda: ${book.title}`"
  >
    <div :class="['w-2 h-14 rounded-full shrink-0', getAccentColor(book.id)]"></div>

    <div class="flex-1 min-w-0">
      <h3 class="truncate text-[1rem] font-semibold text-(--text-primary)">{{ book.title }}</h3>
      <p class="mt-1 truncate text-sm text-(--text-secondary)">{{ formatAuthors(book.authors) }}</p>
    </div>

    <div class="hidden items-center gap-1.5 whitespace-nowrap text-sm text-(--text-muted) sm:flex">
      <span v-html="icons.calendar" class="w-4 h-4"></span>
      {{ book.published_at ? formatDate(book.published_at) : '-' }}
    </div>

    <div class="min-w-[92px] text-right text-[1rem] font-semibold text-(--text-primary)">
      € {{ formatPrice(book.price) }}
    </div>
  </RouterLink>
</template>
