<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

const goToHero = () => {
  router.push({ name: 'hero' })
}
</script>

<template>
  <div class="public-navbar">
    <button @click="goToHero" class="public-navbar__brand">
      {{ t('common.library') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.public-navbar {
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(245, 240, 232, 0.1);

  &__brand {
    font-family: var(--font-display);
    font-size: 1.75rem;
    color: var(--color-text);
    letter-spacing: 0.1em;
    font-weight: 400;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s var(--ease-smooth);

    &:hover {
      color: var(--color-accent);
    }
  }
}
</style>
