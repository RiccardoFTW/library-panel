<script setup lang="ts">
import FieldMessage from './FieldMessage.vue'

const { t } = useI18n()

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  resource: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  errors: {
    type: Object,
    default: () => { },
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-field">
    <label v-if="showLabel" class="input-field__label">
      {{ label ?? t(`${resource}.${name}`) }}
    </label>
    <input :type="type" :placeholder="placeholder ?? t(`${resource}.${name}._placeholder`)" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="['input-field__input', { 'input-field__input--error': errors[name] }]" />
    <FieldMessage v-if="errors[name]" :message="errors[name]" />
  </div>
</template>

<style scoped lang="scss">
.input-field {
  margin-bottom: 1.25rem;

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &__input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid rgba(245, 240, 232, 0.15);
    border-radius: 0.75rem;
    outline: none;
    transition: all 0.3s var(--ease-smooth);

    &::placeholder {
      color: var(--color-text-muted);
      opacity: 0.6;
    }

    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.15);
    }

    &:hover:not(:focus) {
      border-color: rgba(245, 240, 232, 0.3);
    }

    &--error {
      border-color: #f87171;

      &:focus {
        border-color: #f87171;
        box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
      }
    }
  }
}
</style>
