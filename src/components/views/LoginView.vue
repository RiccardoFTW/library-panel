<script setup lang="ts">
import PublicLayout from '../layouts/PublicLayout.vue'
import FormLogin from '../molecules/FormLogin.vue'
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col items-center">
      <FormLogin />
      <p class="mt-4 text-gray-500 pb-6">
        Non hai un account?
        <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-medium">
          Registrati qui
        </router-link>
      </p>
    </div>
  </PublicLayout>
</template>

<style scoped></style>
