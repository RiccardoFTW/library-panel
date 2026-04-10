<script setup lang="ts">
import PublicNavbar from '@/components/molecules/PublicNavbar.vue'

const route = useRoute()
const isWelcomeRoute = computed(() => route.name === 'welcome')
</script>

<template>
  <div class="auth-layout">
    <PublicNavbar />
    <div class="auth-layout__container">
      <div class="auth-layout__card" :class="{ 'auth-layout__card--plain': isWelcomeRoute }">
        <div class="auth-layout__content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  background: var(--surface-page);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(var(--space-4), 2.6vw, var(--space-6));
  position: relative;
  color: var(--text-primary);

  &__container {
    width: 100%;
    max-width: 460px;
    position: relative;
    z-index: 5;
  }

  &__card {
    position: relative;
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-card);
    box-shadow: 0 4px 20px rgba(32, 38, 45, 0.06);
    overflow: hidden;

    &--plain {
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
      overflow: visible;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    padding-block: var(--space-1);
  }
}
</style>
