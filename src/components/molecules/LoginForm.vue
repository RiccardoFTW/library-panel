<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import type { LoginResponse } from '@/types/auth'
import type { ApiError } from '@/services/api'

const { t } = useI18n()
const router = useRouter()
const { login } = useAuth()

interface FormData {
  email: string
  password: string
}

const formData = reactive<FormData>({
  email: '',
  password: '',
})

// SPOSTARE questa interface un un file dove ci sono i types globali tipo utils o globalTypes...
interface Errors {
  _global?: string
  [key: string]: string | undefined
}

const errors = ref<Errors>({})
const formName = ref('login')

const errorMessage = ref('')
const loading = ref(false)
const successMessage = ref('')

const handleSubmit = () => {
  errorMessage.value = ''
  errors.value = {}

  loading.value = true

  login(formData)
    .then((response: LoginResponse) => {
      successMessage.value = response.message || t('login.success')
      setTimeout(() => {
        successMessage.value = ''
        router.replace({ name: 'home' })
      }, 1500)
    })
    .catch((error: ApiError) => {
      errorMessage.value = error.error
      errors.value = error.errors ?? {}
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
      <InputField v-model="formData.email" :resource="formName" name="email" type="email" :errors="errors"
        label="Email" />

      <InputField v-model="formData.password" :resource="formName" type="password" name="password" :errors="errors"
        label="Password" />
    </div>

    <!-- Da rendere Componente riutilizzabile con prop per la class... (warning, success, error) -->
    <div v-show="errorMessage" class="login-form__error">
      <!-- Icona e classe saranno props del componente del tipo `${classes}` che potrebbe essere is-error o is-success... -->
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
      </svg>
      {{ errorMessage }}
    </div>

    <ButtonForm resource="login" type="submit" :text="t('login.submit')" :loading-text="t('login.submitting')"
      :loading="loading" />
  </form>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-5) var(--space-4);

  &__header {
    text-align: center;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3.6vw, 1.55rem);
    color: var(--text-primary);
    letter-spacing: -0.02em;
    font-weight: 600;
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

  &__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    margin: 0;
    background: var(--danger-soft);
    border: 1px solid #eccccc;
    border-radius: var(--radius-control);
    color: var(--danger);
    font-family: var(--font-body);
    font-size: 0.8125rem;
    line-height: var(--lh-snug);
  }

  &__fields {
    margin: 0;
    font-family: var(--font-body);

    :deep(.input-field:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
