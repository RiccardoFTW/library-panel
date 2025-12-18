<script setup lang="ts">
import { ref, reactive } from 'vue'
import { login } from '@/services/AuthService'
import Button from '@/components/atoms/ButtonForm.vue'
import InputField from '@/components/atoms/InputField.vue'

const formData = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

// Submit
const handleSubmit = () => {
  errorMessage.value = ''
  loading.value = true

  login(formData)
    .then((response) => {
      console.log('Login riuscito', response.data)
      // Genera un Bearer Token fittizio per simulare l'autenticazione e fai un redirect con il router verso la homepage "/"
    })
    .catch((error) => {
      console.log('Errore durante il login', error)
      errorMessage.value = 'Credenziali non valide'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full p-8">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Accedi</h2>

    <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
      {{ errorMessage }}
    </div>

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
      placeholder="Inserisci la tua password"
    />

    <Button type="submit" :text="loading ? 'Caricamento...' : 'Accedi'" />
  </form>
</template>
