<script setup lang="ts">
import { logout } from '@/services/AuthService'

const router = useRouter()
const { t } = useI18n()

const goToHome = () => {
  router.push({ name: 'home' })
}

const signout = async () => {
  await logout()
  router.push({ name: 'hero' })
}
</script>

<template>
  <nav class="auth-navbar">
    <button @click="goToHome" class="auth-navbar__brand">{{ t('common.library') }}</button>

    <div class="auth-navbar__links">
      <RouterLink to="/dashboard" class="auth-navbar__link">{{ t('common.home') }}</RouterLink>
      <button type="button" class="auth-navbar__logout" @click="signout">
        {{ t('common.logout') }}
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.auth-navbar {
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__brand {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--color-bg);
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s var(--ease-smooth);

    &:hover {
      opacity: 0.7;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__link {
    font-family: var(--font-body);
    font-weight: 500;
    color: var(--color-bg);
    text-decoration: none;
    transition: opacity 0.3s var(--ease-smooth);

    &:hover {
      opacity: 0.7;
    }
  }

  &__logout {
    font-family: var(--font-body);
    font-weight: 500;
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s var(--ease-smooth);

    &:hover {
      color: #dc2626;
    }
  }
}
</style>
