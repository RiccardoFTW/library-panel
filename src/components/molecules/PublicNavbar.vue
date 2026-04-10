<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const isWelcome = computed(() => route.name === 'welcome')

/** Dalla login/registrazione torna alla schermata principale (scelta accedi / registrati). */
const goToWelcome = () => {
  router.push({ name: 'welcome' })
}
</script>

<template>
  <div class="public-navbar" :class="{ 'public-navbar--hidden': isWelcome }">
    <button type="button" class="public-navbar__brand" @click="goToWelcome">
      {{ t('common.library') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.public-navbar {
  position: fixed;
  top: 1.1rem;
  left: 1.2rem;
  z-index: 20;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  margin: 0;

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &__brand {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 1.5vw, 1.35rem);
    color: var(--text-primary);
    letter-spacing: -0.02em;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-muted);
    }
  }
}
</style>
