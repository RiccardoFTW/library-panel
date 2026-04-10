<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'Cerca...',
  },
)

const emit = defineEmits<{
  search: [query: string]
}>()

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('search', value)
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="w-64 rounded-lg border border-(--border-subtle) bg-(--surface-control) px-3 py-2 text-sm text-(--text-primary) outline-none transition-colors focus:border-(--accent-primary) focus:ring-2 focus:ring-[rgba(61,133,193,0.15)]"
    @input="onInput"
  />
</template>
