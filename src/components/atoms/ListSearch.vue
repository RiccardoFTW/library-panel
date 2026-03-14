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
    class="w-64 px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800"
    @input="onInput"
  />
</template>
