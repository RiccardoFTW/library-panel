<script setup lang="ts">
import type { RouterLink } from 'vue-router'
</script>

<template>
  <div class="navbar flex p-4 gap-4 bg-blue-900">
    <h2 class="text-gray-50">Library Panel</h2>
    <div class="navbar_voices flex gap-4">
      <RouterLink to="/login" class="text-gray-300 hover:text-white">Login</RouterLink>
      <RouterLink to="/register" class="text-gray-300 hover:text-white">Registrati</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
