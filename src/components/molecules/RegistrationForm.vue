<script setup lang="ts">
import { ref, reactive } from 'vue'
import { signup } from '@/services/AuthService'
import InputField from '@/components/atoms/InputField.vue'
import Button from '@/components/atoms/ButtonForm.vue'

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const loading = ref(false)

// Submit
const handleSubmit = () => {
  errorMessage.value = ''
  loading.value = true

  signup(formData)
    .then((response) => {
      console.log('Registrazione riuscita', response.data)
      // Reindirizza o esegui altre azioni dopo la registrazione riuscita
    })
    .catch((error) => {
      console.log('Errore durante la registrazione', error)
      errorMessage.value = 'Non è stato possibile completare la registrazione'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full p-8">
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

<style scoped></style>
