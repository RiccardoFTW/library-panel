<script setup lang="ts">
import { reactive } from 'vue'

const contatore = reactive({ a: { x: 4 }, b: 0 })

const increment = () => {
  contatore.a.x = 10
}
</script>

<template>
  <div class="card">
    <button @click="increment">+ {{ contatore.a.x }}</button>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.card {
  @apply p-4 bg-red-500;

  h1 {
    @apply text-xl font-bold;
  }

  .btn {
    @apply mt-2 text-blue-500;
  }
}
</style>
