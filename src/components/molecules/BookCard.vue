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

const getBookInitials = (title: string): string => {
  const words = title.trim().split(/\s+/).slice(0, 2)
  return words.map((word) => word[0]?.toUpperCase() ?? '').join('') || 'BK'
}

const truncatePlot = (plot: string): string => {
  if (!plot) return 'Nessuna descrizione disponibile.'
  return plot.length > 120 ? `${plot.slice(0, 120)}...` : plot
}

const getPlaceholderColor = (id: number): string => {
  const colors = [
    'from-[#8bb6da] to-[#5b94c3]',
    'from-[#9db8d2] to-[#718fb0]',
    'from-[#84a7c5] to-[#6889a8]',
    'from-[#a8bfd8] to-[#7698b8]',
  ]
  return colors[id % colors.length] || 'from-[#8bb6da] to-[#5b94c3]'
}
</script>

<template>
  <RouterLink
    :to="{ name: 'books.show', params: { id: book.id } }"
    class="flex items-stretch gap-4 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--surface-card) p-4 text-inherit no-underline shadow-[0_4px_18px_rgba(32,38,45,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(32,38,45,0.11)]"
    :aria-label="`Apri scheda: ${book.title}`"
  >
    <div
      :class="[
        'relative flex w-26 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br text-white',
        getPlaceholderColor(book.id),
      ]"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.3),transparent_44%)]"></div>
      <span class="relative z-10 text-lg font-semibold tracking-[0.08em]">
        {{ getBookInitials(book.title) }}
      </span>
    </div>

    <div class="min-w-0 flex flex-col flex-1 py-1">
      <h2 class="line-clamp-2 text-[1.35rem] leading-[1.1] font-semibold tracking-[-0.02em] text-(--text-primary)">
        {{ book.title }}
      </h2>
      <p class="mt-1.5 line-clamp-1 text-sm text-(--text-secondary)">
        {{ formatAuthors(book.authors) }}
      </p>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-(--text-muted)">
        {{ truncatePlot(book.plot) }}
      </p>

      <div class="flex justify-between items-center mt-auto pt-3">
        <span class="flex items-center gap-1.5 whitespace-nowrap text-xs text-(--text-muted)">
          <span v-html="icons.calendar" class="w-4 h-4"></span>
          {{ book.published_at ? formatDate(book.published_at) : '-' }}
        </span>
        <span class="text-lg font-semibold tracking-tight text-(--text-primary)">
          € {{ formatPrice(book.price) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
