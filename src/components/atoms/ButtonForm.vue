<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    default: 'Click',
  },
})
</script>

<template>
  <button
    class="w-full bg-black text-gray-100 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped></style>
