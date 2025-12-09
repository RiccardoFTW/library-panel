<template>
  <form class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Accedi</h2>

    <InputField type="email" label="Email" placeholder="Inserisci la tua email" />

    <InputField type="password" label="Password" placeholder="Inserisci la tua password" />

    <Button type="submit" text="Accedi" />
  </form>
</template>

<script setup lang="ts">
import InputField from '../atoms/InputField.vue'
import Button from '../atoms/ButtonForm.vue'
</script>

<style scoped></style>
