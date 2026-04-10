<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="welcome-view">
    <h1 class="welcome-view__title">{{ t('common.library') }}</h1>
    <p class="welcome-view__subtitle">{{ t('welcome.tagline') }}</p>

    <div class="welcome-view__actions">
      <RouterLink to="/login" class="welcome-view__btn welcome-view__btn--primary">
        {{ t('welcome.cta_login') }}
      </RouterLink>
      <RouterLink to="/register" class="welcome-view__btn welcome-view__btn--secondary">
        {{ t('welcome.cta_register') }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.welcome-view {
  width: min(100%, 340px);
  margin: 0 auto;
  text-align: center;
  color: var(--text-primary);

  &__title {
    font-family: var(--font-display);
    margin: 0 0 var(--space-2);
    font-size: clamp(1.7rem, 4.2vw, 1.95rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: var(--lh-tight);
  }

  &__subtitle {
    margin: 0 0 var(--space-6);
    color: var(--text-muted);
    font-size: 0.82rem;
    line-height: var(--lh-snug);
  }

  &__actions {
    display: grid;
    gap: var(--space-2);
  }

  &__btn {
    width: 100%;
    border-radius: var(--radius-control);
    padding: var(--space-2) var(--space-4);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid transparent;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &--primary {
      background: var(--accent-primary);
      color: #fff;

      &:hover {
        background: var(--accent-primary-hover);
      }
    }

    &--secondary {
      background: var(--accent-secondary);
      border-color: var(--border-subtle);
      color: var(--text-primary);

      &:hover {
        background: #dce2e9;
      }
    }
  }
}
</style>
