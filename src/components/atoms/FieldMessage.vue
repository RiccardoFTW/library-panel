<script setup lang="ts">
defineProps<{
  message: string
  icon?: string
  className?: string
}>()
</script>

<template>
  <div :class="['field-message', className]">
    <span v-if="icon" v-html="icon" :class="['field-icon', className]"></span>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      :class="['field-icon', className]"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"
      />
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.field-message {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin-top: var(--space-2);
  font-family: var(--font-body);
  font-size: 0.75rem;
  line-height: var(--lh-snug);
  color: var(--danger);
}

.field-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  color: var(--danger);
}
</style>
