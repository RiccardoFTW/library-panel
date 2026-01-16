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
  .error {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: #f87171;
  }
  .success {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: #34d399;
  }
}

.field-icon {
  .error {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
    color: #f87171;
  }
  .success {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
    color: #34d399;
  }
}
</style>
