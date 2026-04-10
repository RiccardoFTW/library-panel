<script setup lang="ts">
const { t } = useI18n()

const handleLoginSuccess = (data: unknown) => {
  // Gestisci il successo del login, ad esempio salvando il token o reindirizzando
  console.log('Login riuscito:', data)
}

const handleLoginError = (error: unknown) => {
  // Gestisci l'errore del login, ad esempio mostrando un messaggio all'utente
  console.error('Errore durante il login:', error)
}
</script>

<template>
  <div class="login-view">
    <LoginForm @login-success="handleLoginSuccess" @login-error="handleLoginError" />
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
  padding: var(--space-1) var(--space-2) var(--space-4);

  &__footer {
    padding: var(--space-4) var(--space-5) var(--space-4);
    text-align: center;
  }

  &__text {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    line-height: var(--lh-snug);
    color: var(--text-muted);
    margin: 0;
  }

  &__link {
    color: var(--text-secondary);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>
