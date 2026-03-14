<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import type { ApiError } from '@/services/api'

const { signup } = useAuth()

const { t } = useI18n()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const loading = ref(false)

const validate = (): boolean => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!formData.name) {
    errors.name = t('validation.username_required')
    isValid = false
  } else if (formData.name.length < 3) {
    errors.name = t('validation.username_too_short')
    isValid = false
  }

  if (!formData.email) {
    errors.email = t('validation.email_required')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('validation.email_invalid')
    isValid = false
  }

  if (!formData.password) {
    errors.password = t('validation.password_required')
    isValid = false
  } else if (formData.password.length < 8) {
    errors.password = t('validation.password_too_short')
    isValid = false
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = t('validation.confirm_password_required')
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = t('validation.passwords_not_match')
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  errorMessage.value = ''

  if (!validate()) {
    return
  }

  loading.value = true

  signup({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: 'user',
  })
    .then((response) => {
      console.log(t('register.success'), response.data)
    })
    .catch((error: ApiError) => {
      console.log(t('register.error'), error)
      errorMessage.value = error.error || error.message || t('register.error_generic')
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

    <div v-if="errorMessage" class="register-form__error">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
      </svg>
      {{ errorMessage }}
    </div>

    <div class="register-form__fields">
      <InputField
        v-model="formData.name"
        type="text"
        :label="t('register.username')"
        :placeholder="t('register.username_placeholder')"
        :error="errors.name"
      />

      <InputField
        v-model="formData.email"
        type="email"
        :label="t('register.email')"
        :placeholder="t('register.email_placeholder')"
        :error="errors.email"
      />

      <InputField
        v-model="formData.password"
        type="password"
        :label="t('register.password')"
        :placeholder="t('register.password_placeholder')"
        :error="errors.password"
      />

      <InputField
        v-model="formData.confirmPassword"
        type="password"
        :label="t('register.confirm_password')"
        :placeholder="t('register.confirm_password_placeholder')"
        :error="errors.confirmPassword"
      />
    </div>

    <ButtonForm
      type="submit"
      :text="loading ? t('register.submitting') : t('register.submit')"
      :loading="loading"
    />
  </form>
</template>

<style scoped lang="scss">
.register-form {
  padding: 2rem;

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  &__error {
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

  &__fields {
    margin-bottom: 1.5rem;
  }
}
</style>
