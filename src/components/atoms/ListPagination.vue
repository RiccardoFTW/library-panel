<script setup lang="ts">
import { computed } from 'vue'

type PageItem = number | 'ellipsis'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits<{
  'change-page': [page: number]
}>()

const pageItems = computed((): PageItem[] => {
  const cur = props.currentPage
  const last = props.lastPage

  if (last <= 5) {
    return Array.from({ length: last }, (_, i) => i + 1)
  }

  const out: PageItem[] = []
  const ell = () => {
    if (out[out.length - 1] !== 'ellipsis') out.push('ellipsis')
  }

  out.push(1)

  if (cur <= 4) {
    for (let p = 2; p <= Math.min(4, last - 1); p++) out.push(p)
    if (last > 5) ell()
  } else if (cur >= last - 3) {
    ell()
    for (let p = last - 3; p <= last; p++) {
      if (p > 1) out.push(p)
    }
  } else {
    ell()
    out.push(cur - 1, cur, cur + 1)
    ell()
  }

  if (out[out.length - 1] !== last) out.push(last)
  return out
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('change-page', page)
  }
}
</script>

<template>
  <nav class="list-pagination" aria-label="Paginazione risultati">
    <button
      type="button"
      :disabled="currentPage === 1"
      class="list-pagination__nav list-pagination__nav--edge"
      aria-label="Pagina precedente"
      @click="goToPage(currentPage - 1)"
    >
      ‹
    </button>

    <div class="list-pagination__pages" role="list">
      <template v-for="(item, index) in pageItems" :key="`${item}-${index}`">
        <span v-if="index > 0" class="list-pagination__sep" aria-hidden="true">-</span>

        <span v-if="item === 'ellipsis'" class="list-pagination__ellipsis" aria-hidden="true"
          >…</span
        >

        <button
          v-else
          type="button"
          role="listitem"
          class="list-pagination__page"
          :class="{ 'list-pagination__page--current': item === currentPage }"
          :aria-label="`Pagina ${item}`"
          :aria-current="item === currentPage ? 'page' : undefined"
          @click="goToPage(item)"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <button
      type="button"
      :disabled="currentPage === lastPage"
      class="list-pagination__nav list-pagination__nav--edge"
      aria-label="Pagina successiva"
      @click="goToPage(currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>

<style scoped lang="scss">
.list-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-5);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-secondary);
}

.list-pagination__pages {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 var(--space-2);
}

.list-pagination__sep {
  user-select: none;
  color: var(--text-muted);
  font-weight: 400;
}

.list-pagination__ellipsis {
  user-select: none;
  color: var(--text-muted);
  padding: 0 var(--space-1);
  font-weight: 400;
}

.list-pagination__nav {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 1.1rem;
  line-height: 1;
  padding: var(--space-1) var(--space-2);
  cursor: pointer;
  border-radius: var(--radius-control);
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover:not(:disabled) {
    color: var(--text-primary);
    background: var(--surface-muted);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

.list-pagination__page {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  min-width: 1.25rem;
  padding: var(--space-1) 0;
  cursor: pointer;
  border-radius: var(--radius-control);
  transition: color 0.15s ease;

  &:hover:not(.list-pagination__page--current) {
    color: var(--accent-primary);
  }

  &--current {
    color: var(--text-primary);
    font-weight: 700;
    cursor: default;
  }
}
</style>
