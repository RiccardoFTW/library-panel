<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'error' | 'success' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    message?: string
    type?: AlertType
    icon?: string
  }>(),
  {
    type: 'info',
    message: '',
    icon: '',
  },
)

const ICONS: Record<AlertType, string> = {
  error:
    'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z',
  success:
    'M229.66,77.66l-96,96a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,156.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z',
  warning:
    'M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z',
  info: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm12,176a8,8,0,0,1-16,0V128a8,8,0,0,1,16,0Zm-20-96a12,12,0,1,1,12,12A12,12,0,0,1,120,104Z',
}

const iconPath = computed(() => ICONS[props.type])
</script>

<template>
  <div :class="['alert-message', `alert-message--${type}`]" role="alert">
    <span v-if="icon" v-html="icon" class="alert-message__icon"></span>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="alert-message__icon"
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path :d="iconPath" />
    </svg>
    <span class="alert-message__text">
      <slot>{{ message }}</slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.alert-message {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  margin: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  font-family: var(--font-body);
  font-size: 0.8125rem;
  line-height: var(--lh-snug);

  &__icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

  &__text {
    flex: 1;
  }

  &--error {
    background: var(--danger-soft);
    border-color: var(--danger-border);
    color: var(--danger);
  }

  &--success {
    background: var(--success-soft);
    border-color: var(--success-border);
    color: var(--success);
  }

  &--warning {
    background: var(--warning-soft);
    border-color: var(--warning-border);
    color: var(--warning);
  }

  &--info {
    background: var(--info-soft);
    border-color: var(--info-border);
    color: var(--info);
  }
}
</style>
