<template>
  <form class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Registrati</h2>

    <InputField
      v-model="formData.username"
      type="text"
      label="Nome Utente"
      placeholder="Scegli un nome utente"
    />

    <InputField
      v-model="formData.email"
      type="email"
      label="Email"
      placeholder="Inserisci la tua email"
    />

    <InputField
      v-model="formData.password"
      type="password"
      label="Password"
      placeholder="Crea una password"
    />

    <InputField
      v-model="formData.confirmPassword"
      type="password"
      label="Conferma Password"
      placeholder="Ripeti la password"
    />

    <Button type="submit" text="Registrati" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import InputField from '../atoms/InputField.vue'
import Button from '../atoms/Button.vue'

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
</script>

<style scoped></style>
