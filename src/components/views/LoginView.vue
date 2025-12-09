<template>
  <LibraryNavabar />
  <div class="flex flex-col items-center">
    <FormLogin />
    <p class="mt-4 text-gray-600">
      Non hai un account?
      <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-medium">
        Registrati qui
      </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import FormLogin from '../molecules/FormLogin.vue'
import LibraryNavabar from '../molecules/LibraryNavabar.vue'
</script>

<style scoped></style>
