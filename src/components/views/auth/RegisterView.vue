<script setup lang="ts">
import RegistrationForm from '@/components/molecules/RegistrationForm.vue'
</script>

<template>
  <div class="register-view">
    <RegistrationForm />
    <div class="register-view__footer">
      <p class="register-view__text">
      Hai già un account?
        <router-link to="/login" class="register-view__link">
          Accedi
      </router-link>
    </p>
    </div>
  </div>
</template>

<style scoped>
.register-view__footer {
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(245, 240, 232, 0.1);
}

.register-view__text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.register-view__link {
  color: var(--color-accent);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s var(--ease-smooth);
}

.register-view__link:hover {
  color: var(--color-accent-light);
}
</style>
