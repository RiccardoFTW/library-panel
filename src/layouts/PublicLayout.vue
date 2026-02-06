<script setup lang="ts">
import PublicNavbar from '@/components/molecules/PublicNavbar.vue'
import bgImage from '@/assets/images/shadows-remix.webp'
</script>

<template>
  <div class="auth-layout">
    <!-- Background Image -->
    <div class="auth-layout__bg">
      <img :src="bgImage" alt="" class="auth-layout__bg-img" />
    </div>

    <div class="auth-layout__container">
      <PublicNavbar />
      <div class="auth-layout__card">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }

  &__container {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 10;
  }

  &__card {
    background: rgba(26, 23, 20, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 1.5rem;
    border: 1px solid rgba(245, 240, 232, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}
</style>
