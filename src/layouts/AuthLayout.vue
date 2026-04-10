<script setup lang="ts">
import AuthNavbar from '@/components/molecules/AuthNavbar.vue'
</script>

<template>
  <div class="auth-layout">
    <AuthNavbar />
    <main class="auth-layout__main">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  background: var(--surface-page);
  color: var(--text-primary);

  &__main {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: calc(3.75rem + var(--space-3)) var(--space-4) var(--space-5);
  }
}
</style>
