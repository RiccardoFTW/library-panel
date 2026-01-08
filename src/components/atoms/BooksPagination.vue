<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '@/components/icons/icons'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const pages = computed(() => {
  const result: number[] = []
  for (let i = 1; i <= props.lastPage; i++) {
    result.push(i)
  }
  return result
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div class="flex justify-center items-center gap-2 mt-6">
    <button
      :disabled="currentPage === 1"
      class="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center justify-center"
      @click="goToPage(currentPage - 1)"
    >
      <span v-html="icons.chevronLeft" class="w-5 h-5"></span>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      :class="[
        'w-10 h-10 rounded border transition-colors flex items-center justify-center',
        page === currentPage
          ? 'bg-gray-800 text-white border-gray-800'
          : 'bg-white text-gray-700 hover:bg-gray-100',
      ]"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === lastPage"
      class="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center justify-center"
      @click="goToPage(currentPage + 1)"
    >
      <span v-html="icons.chevronRight" class="w-5 h-5"></span>
    </button>
  </div>
</template>
