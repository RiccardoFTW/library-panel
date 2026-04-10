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

// SPOSTARE questa interface un un file dove ci sono i types globali tipo utils o globalTypes...
interface Errors {
  _global?: string
  [key: string]: string | undefined
}

const errors = ref<Errors>({})
const formName = ref('login')

const errorMessage = ref('')
const loading = ref(false)

const handleSubmit = () => {
  errorMessage.value = ''
  errors.value = {}

  loading.value = true

  login(formData)
    .then((response: LoginResponse) => {
      console.log(t('login.success'), response.access_token)
      router.replace({ name: 'home' })
    })
    .catch((error: ApiError) => {
      errorMessage.value = error.error
      if (error.errors) {
        errors.value = error.errors
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

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <div class="login-form__fields">
      <InputField
        v-model="formData.email"
        :resource="formName"
        name="email"
        type="email"
        :errors="errors"
        label="Email"
      />

      <InputField
        v-model="formData.password"
        :resource="formName"
        type="password"
        name="password"
        :errors="errors"
        label="Password"
      />
    </div>

    <ButtonForm
      resource="login"
      type="submit"
      :text="t('login.submit')"
      :loading-text="t('login.submitting')"
      :loading="loading"
    />
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

  &__fields {
    margin: 0;
    font-family: var(--font-body);

    :deep(.input-field:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
