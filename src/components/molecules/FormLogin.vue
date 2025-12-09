<template>
  <form class="w-full max-w-md bg-white p-8 rounded-lg shadow-md" @submit.prevent="login">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Accedi</h2>

    <InputField type="email" label="Email" placeholder="Inserisci la tua email" v-model="email" />
    <InputField
      type="password"
      label="Password"
      placeholder="Inserisci la tua password"
      v-model="password"
    />

    <Button type="submit" text="Accedi" />
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import InputField from '../atoms/InputField.vue'
import Button from '../atoms/ButtonForm.vue'

const formData = reactive({
  email: ref('email'),
  password: ref('password'),
})

const login = () => {
  // Service chiama la funzione login verso un'api server
  console.log(JSON.stringify(formData), 'formData')
  alert('Hai inviato i dati di login!')
}
</script>

<style scoped></style>
