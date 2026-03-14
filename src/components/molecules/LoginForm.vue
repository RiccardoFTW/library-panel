<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import type { LoginResponse } from '@/types/auth'
import type { ApiError } from '@/services/api'

const { t } = useI18n()
const router = useRouter()
const { login } = useAuth()

const formData = reactive({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

const handleSubmit = () => {
  errorMessage.value = ''
  errors.value = { email: '', password: '' }

  loading.value = true

  login(formData)
    .then((response: LoginResponse) => {
      console.log(t('login.success'), response.access_token)
      router.push({ name: 'home' })
    })
    .catch((error: ApiError) => {
      console.error('Login fallito:', error)
      if (error) {
        errorMessage.value = error.error || error.message || 'Errore sconosciuto'
        if (error.errors) {
          errors.value = { email: '', password: '', ...error.errors }
        }
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="login-form__header">
      <h2 class="login-form__title">{{ t('login.title') }}</h2>
      <p class="login-form__subtitle">{{ t('login.subtitle') }}</p>
    </div>

    <div class="login-form__fields">
      <InputField
        v-model="formData.email"
        type="email"
        :label="t('login.email')"
        :placeholder="t('login.email_placeholder')"
        :error="errors.email"
      />

      <InputField
        v-model="formData.password"
        type="password"
        :label="t('login.password')"
        :placeholder="t('login.password_placeholder')"
        :error="errors.password"
      />
    </div>

    <!-- Da rendere Componente riutilizzabile con prop per la class... (warning, success, error) -->
    <div v-show="errorMessage" class="login-form__error">
      <!-- Icona e classe saranno props del componente del tipo `${classes}` che potrebbe essere is-error o is-success... -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path
          d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"
        />
      </svg>
      {{ errorMessage }}
    </div>

    <ButtonForm
      type="submit"
      :text="loading ? t('login.submitting') : t('login.submit')"
      :loading="loading"
    />
  </form>
</template>

<style scoped lang="scss">
.login-form {
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
