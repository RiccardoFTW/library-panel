<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  text?: string
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  text: 'Click',
  variant: 'primary',
  loading: false,
})
</script>

<template>
  <button :type="type" :class="['btn-form', `btn-form--${variant}`]" :disabled="loading">
    <span v-if="loading" class="btn-form__spinner"></span>
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped lang="scss">
.btn-form {
  width: 100%;
  padding: 1rem 1.5rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s var(--ease-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--color-accent);
    color: var(--color-bg);
    border-color: var(--color-accent);

    &:hover:not(:disabled) {
      background: var(--color-accent-light);
      border-color: var(--color-accent-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(201, 169, 98, 0.3);
    }
  }

  &--secondary {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-text-muted);

    &:hover:not(:disabled) {
      background: var(--color-text);
      color: var(--color-bg);
      border-color: var(--color-text);
      transform: translateY(-2px);
    }
  }

  &__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
