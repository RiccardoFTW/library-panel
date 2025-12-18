<script setup lang="ts">
import LoginForm from '@/components/molecules/LoginForm.vue'
</script>

<template>
  <div class="flex flex-col items-center">
    <login-form />
    <p class="mt-4 text-gray-500 pb-6">
      Non hai un account?
      <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-medium">
        Registrati qui
      </router-link>
    </p>
  </div>
</template>

<style scoped></style>
