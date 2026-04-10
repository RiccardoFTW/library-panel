<script setup lang="ts">
defineProps<{
  options: { value: string; label: string; icon?: string }[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="inline-flex overflow-hidden rounded-lg border border-(--border-subtle) bg-(--surface-card)">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[
        'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors',
        modelValue === option.value
          ? 'bg-(--accent-primary) text-white'
          : 'bg-(--surface-card) text-(--text-secondary) hover:bg-(--surface-muted)',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      <span v-if="option.icon" v-html="option.icon" class="w-5 h-5"></span>
      {{ option.label }}
    </button>
  </div>
</template>
