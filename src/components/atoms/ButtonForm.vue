<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  text?: string
  variant?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
  resource?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  text: 'Click',
  variant: 'primary',
  loading: false,
  loadingText: '',
  resource: '',
})
const { t } = useI18n()

const getButtonText = () => {
  let result = ''
  if (props.loading) {
    result = props.loadingText ?? `${props.resource}.submitting`
  } else {
    result = props.text ?? `${props.resource}.submit`
  }
  return t(result)
}
</script>

<template>
  <button :type="type" :class="['btn-form', `btn-form--${variant}`]" :disabled="loading">
    <span v-if="loading" class="btn-form__spinner" />
    <slot>{{ getButtonText() }}</slot>
  </button>
</template>

<style scoped lang="scss">
.btn-form {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: var(--lh-snug);
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--accent-primary);
    color: #ffffff;
    border-color: var(--accent-primary);

    &:hover:not(:disabled) {
      background: var(--accent-primary-hover);
      border-color: var(--accent-primary-hover);
    }
  }

  &--secondary {
    background: var(--accent-secondary);
    color: var(--text-primary);
    border-color: var(--border-subtle);

    &:hover:not(:disabled) {
      background: #dce2e9;
      border-color: var(--border-strong);
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
