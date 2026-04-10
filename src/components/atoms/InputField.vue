<script setup lang="ts">
import FieldMessage from './FieldMessage.vue'

const { t } = useI18n()

const props = defineProps({
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
    default: () => ({}),
  },
  error: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue'])

const isPasswordVisible = ref(false)
const isPasswordField = computed(() => props.type === 'password')
const inputType = computed(() => {
  if (!isPasswordField.value) return props.type
  return isPasswordVisible.value ? 'text' : 'password'
})
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="input-field">
    <label v-if="showLabel" class="input-field__label">
      {{ label || t(`${resource}.${name}`) }}
    </label>
    <div class="input-field__control">
      <input
        :type="inputType"
        :placeholder="placeholder || t(`${resource}.${name}_placeholder`)"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'input-field__input',
          {
            'input-field__input--error': errors?.[name] || error,
            'input-field__input--with-toggle': isPasswordField,
          },
        ]"
        :aria-invalid="Boolean(errors?.[name] || error)"
      />
      <button
        v-if="isPasswordField"
        type="button"
        class="input-field__toggle"
        @click="togglePasswordVisibility"
      >
        {{ isPasswordVisible ? 'Nascondi' : 'Mostra' }}
      </button>
    </div>
    <FieldMessage v-if="errors?.[name] || error" :message="errors?.[name] || error" />
  </div>
</template>

<style scoped lang="scss">
.input-field {
  margin-bottom: var(--space-3);

  &__label {
    display: block;
    margin-bottom: var(--space-2);
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  &__control {
    position: relative;
  }

  &__input {
    width: 100%;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-body);
    font-size: 0.875rem;
    line-height: var(--lh-snug);
    color: var(--text-primary);
    background: var(--surface-control);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-control);
    outline: none;
    transition: all 0.3s var(--ease-smooth);

    &::placeholder {
      color: var(--text-muted);
      opacity: 0.85;
    }

    &:focus {
      border-color: var(--accent-primary);
      background: #f7f9fb;
      box-shadow: 0 0 0 3px rgba(61, 133, 193, 0.15);
    }

    &:hover:not(:focus) {
      border-color: var(--border-strong);
    }

    &--error {
      border-color: #f87171;

      &:focus {
        border-color: #f87171;
        box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
      }
    }

    &--with-toggle {
      padding-right: 4.75rem;
    }
  }

  &__toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
  }
}
</style>
