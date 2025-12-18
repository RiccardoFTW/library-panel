<script setup lang="ts">
import RegistrationForm from '@/components/molecules/RegistrationForm.vue'
</script>

<template>
  <div class="flex flex-col items-center">
    <registration-form />
    <p class="mt-4 text-gray-500 pb-6">
      Hai già un account?
      <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-medium">
        Accedi qui
      </router-link>
    </p>
  </div>
</template>

<style scoped></style>
