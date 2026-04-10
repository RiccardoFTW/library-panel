<script setup lang="ts"></script>

<template>
  <section class="about-view">
    <h1 class="about-view__title">Chi siamo</h1>
    <p class="about-view__text">
      Questo pannello e progettato per offrire una gestione della libreria semplice, rapida e coerente in
      tutte le schermate.
    </p>
  </section>
</template>

<style scoped lang="scss">
.about-view {
  margin-top: var(--space-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-card);
  padding: var(--space-5);

  &__title {
    margin: 0 0 var(--space-3);
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: var(--lh-tight);
    color: var(--text-primary);
  }

  &__text {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: var(--lh-body);
  }
}
</style>
