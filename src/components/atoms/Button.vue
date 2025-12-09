<template>
  <button
    :type="type"
    class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

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

<style scoped></style>
