<script setup lang="ts">
// LoginForm è auto-importato
const { t } = useI18n()
</script>

<template>
  <div class="login-view">
    <LoginForm />
    <div class="login-view__footer">
      <p class="login-view__text">
        {{ t('login.no_account') }}
        <router-link to="/register" class="login-view__link">
          {{ t('login.go_to_register') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-view {
  &__footer {
    padding: 1.5rem 2rem;
    text-align: center;
    border-top: 1px solid rgba(245, 240, 232, 0.1);
  }

  &__text {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  &__link {
    color: var(--color-accent);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s var(--ease-smooth);

    &:hover {
      color: var(--color-accent-light);
    }
  }
}
</style>
