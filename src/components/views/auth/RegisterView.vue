<script setup lang="ts">
// RegistrationForm è auto-importato
const { t } = useI18n()
</script>

<template>
  <div class="register-view">
    <RegistrationForm />
    <div class="register-view__footer">
      <p class="register-view__text">
        {{ t('register.have_account') }}
        <router-link to="/login" class="register-view__link">
          {{ t('register.go_to_login') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-view {
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
