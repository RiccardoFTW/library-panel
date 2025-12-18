<script setup lang="ts">
import { ref } from 'vue'
import InputField from '../atoms/InputField.vue'
import Button from '../atoms/ButtonForm.vue'
import { login } from '@/services/AuthService'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

// Submit
const handleSubmit = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await login({
      email: email.value,
      password: password.value,
    })

    if (response.msg === 'Login effettuato con successo') {
      console.log('Login riuscito', response.data)
    } else {
      errorMessage.value = response.msg
    }
  } catch (error) {
    errorMessage.value = 'Errore di connessione'
  } finally {
    loading.value = false
  }
}
</script>

<template>
<<<<<<< HEAD
  <form @submit.prevent="handleSubmit" class="w-full p-8">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Accedi</h2>

    <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
      {{ errorMessage }}
    </div>

    <InputField v-model="email" type="email" label="Email" placeholder="Inserisci la tua email" />
=======
  <form class="w-full max-w-md bg-white p-8 rounded-lg shadow-md" @submit.prevent="login">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Accedi</h2>

    <InputField type="email" label="Email" placeholder="Inserisci la tua email" v-model="email" />
    <InputField
      type="password"
      label="Password"
      placeholder="Inserisci la tua password"
      v-model="password"
    />
>>>>>>> cc0d9e5276f2aefae114522bbf82aeb498f97e87

    <InputField
      v-model="password"
      type="password"
      label="Password"
      placeholder="Inserisci la tua password"
    />

    <Button type="submit" :text="loading ? 'Caricamento...' : 'Accedi'" />
  </form>
</template>

<<<<<<< HEAD
=======
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

>>>>>>> cc0d9e5276f2aefae114522bbf82aeb498f97e87
<style scoped></style>
