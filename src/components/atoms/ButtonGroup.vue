<script setup lang="ts">
defineProps<{
  options: { value: string; label: string; icon?: string }[]
  modelValue: string
}>()

// Evento
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="inline-flex rounded-lg border border-gray-300 overflow-hidden">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[
        'px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2',
        modelValue === option.value
          ? 'bg-gray-800 text-white'
          : 'bg-gray-300 text-gray-700 hover:bg-gray-300',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      <span v-if="option.icon" v-html="option.icon" class="w-5 h-5"></span>
      {{ option.label }}
    </button>
  </div>
</template>
