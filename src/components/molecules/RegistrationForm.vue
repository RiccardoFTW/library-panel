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

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const loading = ref(false)

// Validazione
const validate = (): boolean => {
  let isValid = true
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!formData.username) {
    errors.username = 'Nome utente obbligatorio'
    isValid = false
  } else if (formData.username.length < 3) {
    errors.username = 'Nome utente troppo corto (min 3 caratteri)'
    isValid = false
  }

  if (!formData.email) {
    errors.email = 'Email obbligatoria'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email non valida'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password obbligatoria'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Password troppo corta (min 6 caratteri)'
    isValid = false
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Conferma password obbligatoria'
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Le password non corrispondono'
    isValid = false
  }

  return isValid
}

// Submit
const handleSubmit = () => {
  errorMessage.value = ''
  
  if (!validate()) {
    return
  }

  loading.value = true

  signup(formData)
    .then((response) => {
      console.log('Registrazione riuscita', response.data)
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
  <form @submit.prevent="handleSubmit" class="register-form">
    <div class="register-form__header">
      <h2 class="register-form__title">Crea Account</h2>
      <p class="register-form__subtitle">Unisciti alla nostra biblioteca</p>
    </div>

    <div v-if="errorMessage" class="register-form__error">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
      </svg>
      {{ errorMessage }}
    </div>

    <div class="register-form__fields">
      <InputField
        v-model="formData.username"
        type="text"
        label="Nome Utente"
        placeholder="Il tuo nome utente"
        :error="errors.username"
      />

      <InputField
        v-model="formData.email"
        type="email"
        label="Email"
        placeholder="nome@esempio.com"
        :error="errors.email"
      />

      <InputField
        v-model="formData.password"
        type="password"
        label="Password"
        placeholder="••••••••"
        :error="errors.password"
      />

      <InputField
        v-model="formData.confirmPassword"
        type="password"
        label="Conferma Password"
        placeholder="••••••••"
        :error="errors.confirmPassword"
      />
    </div>

    <Button type="submit" :text="loading ? 'Registrazione...' : 'Registrati'" :loading="loading" />
  </form>
</template>

<style scoped>
.register-form {
  padding: 2rem;
}

.register-form__header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-form__title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.register-form__subtitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.register-form__error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  color: #f87171;
  font-family: var(--font-body);
  font-size: 0.875rem;
}

.register-form__fields {
  margin-bottom: 1.5rem;
}
</style>
