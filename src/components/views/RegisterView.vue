<template>
  <LibraryNavabar />
  <div class="flex flex-col items-center">
    <RegistrationForm />
    <p class="mt-4 text-gray-600">
      Hai già un account?
      <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-medium">
        Accedi qui
      </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import LibraryNavabar from '../molecules/LibraryNavabar.vue'
import RegistrationForm from '../molecules/RegistrationForm.vue'
</script>

<style scoped></style>
