<script setup lang="ts">
import PublicLayout from '../layouts/PublicLayout.vue'
import RegistrationForm from '../molecules/RegistrationForm.vue'
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col items-center">
      <RegistrationForm />
      <p class="mt-4 text-gray-500 pb-6">
        Hai già un account?
        <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-medium">
          Accedi qui
        </router-link>
      </p>
    </div>
  </PublicLayout>
</template>

<style scoped></style>
