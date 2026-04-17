<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import type { ApiError } from '@/services/api'

const { signup } = useAuth()

const { t } = useI18n()

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const formData = ref({} as FormData)

const errors = ref({} as FormErrors)

const errorMessage = ref('')
const loading = ref(false)
const successMessage = ref('')

const validate = (): boolean => {
  let isValid = true
  errors.value.name = ''
  errors.value.email = ''
  errors.value.password = ''
  errors.value.confirmPassword = ''

  if (!formData.value.name) {
    errors.value.name = t('validation.username_required')
    isValid = false
  } else if (formData.value.name.length < 3) {
    errors.value.name = t('validation.username_too_short')
    isValid = false
  }

  if (!formData.value.email) {
    errors.value.email = t('validation.email_required')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = t('validation.email_invalid')
    isValid = false
  }

  if (!formData.value.password) {
    errors.value.password = t('validation.password_required')
    isValid = false
  } else if (formData.value.password.length < 8) {
    errors.value.password = t('validation.password_too_short')
    isValid = false
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = t('validation.confirm_password_required')
    isValid = false
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = t('validation.passwords_not_match')
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''

  /*if (!validate()) {
    return
  }*/

  loading.value = true

  signup({
    ...formData.value,
    role: 'user',
  })
    .then((response) => {
      // Spostare in api.ts per stampare da lì il messaggio di successo
      successMessage.value = response.message || t('register.success')
    })
    .catch((error: ApiError) => {
      // Spostare in api.ts per stampare da lì il messaggio di errore + errori di validazione specifici per ogni campo, se presenti
      errorMessage.value = error.error || t('register.error_generic')
      errors.value = error.errors ?? {} // Risolvere problema di tipizzazione per errori di validazione specifici per ogni campo, se presenti
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <div class="register-form__header">
      <h2 class="register-form__title">{{ t('register.title') }}</h2>
      <p class="register-form__subtitle">{{ t('register.subtitle') }}</p>
    </div>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />
    <AlertMessage v-if="successMessage" type="success" :message="successMessage" />

    <div class="register-form__fields">
      <InputField
        v-model="formData.name"
        type="text"
        label="Nome utente"
        :placeholder="t('register.username_placeholder')"
        :error="errors.name"
      />

      <InputField
        v-model="formData.email"
        type="email"
        label="Email"
        :placeholder="t('register.email_placeholder')"
        :error="errors.email"
      />

      <InputField
        v-model="formData.password"
        type="password"
        label="Password"
        :placeholder="t('register.password_placeholder')"
        :error="errors.password"
      />

      <InputField
        v-model="formData.confirmPassword"
        type="password"
        label="Conferma password"
        :placeholder="t('register.confirm_password_placeholder')"
        :error="errors.confirmPassword"
      />
    </div>

    <ButtonForm
      type="submit"
      loading-text="register.submitting"
      :loading="loading"
      text="register.submit"
    />
  </form>
</template>

<style scoped lang="scss">
.register-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-5) var(--space-4);

  &__header {
    text-align: center;
  }

  &__title {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    font-weight: 600;
    font-size: clamp(1.35rem, 3.6vw, 1.55rem);
    color: var(--text-primary);
    line-height: var(--lh-tight);
    margin: 0 0 var(--space-2);
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 0.8rem;
    line-height: var(--lh-snug);
    color: var(--text-muted);
    margin: 0;
  }

  &__fields {
    margin: 0;

    :deep(.input-field:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
