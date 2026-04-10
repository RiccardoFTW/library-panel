<script setup lang="ts">
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
