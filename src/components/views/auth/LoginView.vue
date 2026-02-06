<script setup lang="ts">
import LoginForm from '@/components/molecules/LoginForm.vue'
</script>

<template>
  <div class="login-view">
    <LoginForm />
    <div class="login-view__footer">
      <p class="login-view__text">
      Non hai un account?
        <router-link to="/register" class="login-view__link">
          Registrati
      </router-link>
    </p>
    </div>
  </div>
</template>

<style scoped>
.login-view__footer {
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(245, 240, 232, 0.1);
}

.login-view__text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.login-view__link {
  color: var(--color-accent);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s var(--ease-smooth);
}

.login-view__link:hover {
  color: var(--color-accent-light);
}
</style>
