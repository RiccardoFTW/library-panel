<script setup lang="ts">
import { ref, reactive } from 'vue'
import { login } from '@/services/AuthService'
import Button from '@/components/atoms/ButtonForm.vue'
import InputField from '@/components/atoms/InputField.vue'

const formData = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

// Validazione
const validate = (): boolean => {
  let isValid = true
  errors.email = ''
  errors.password = ''

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

  return isValid
}

// Submit
const handleSubmit = () => {
  errorMessage.value = ''
  
  if (!validate()) {
    return
  }

  loading.value = true

  login(formData)
    .then((response) => {
      console.log('Login riuscito', response.data)
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
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="login-form__header">
      <h2 class="login-form__title">Bentornato</h2>
      <p class="login-form__subtitle">Accedi al tuo account</p>
    </div>

    <div v-if="errorMessage" class="login-form__error">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
      </svg>
      {{ errorMessage }}
    </div>

    <div class="login-form__fields">
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
    </div>

    <Button type="submit" :text="loading ? 'Accesso in corso...' : 'Accedi'" :loading="loading" />
  </form>
</template>

<style scoped>
.login-form {
  padding: 2rem;
}

.login-form__header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-form__title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.login-form__subtitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.login-form__error {
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

.login-form__fields {
  margin-bottom: 1.5rem;
}
</style>
