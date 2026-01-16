<script setup lang="ts">
import { useRouter } from 'vue-router'
import { TOKEN_KEY } from '@/services/api'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home' })
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  router.push({ name: 'hero' })
}
</script>

<template>
  <nav class="auth-navbar">
    <button @click="goToHome" class="auth-navbar__brand">Library</button>

    <div class="auth-navbar__links">
      <RouterLink to="/dashboard" class="auth-navbar__link">Home</RouterLink>
      <button type="button" class="auth-navbar__logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
.auth-navbar {
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth-navbar__brand {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--color-bg);
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s var(--ease-smooth);
}

.auth-navbar__brand:hover {
  opacity: 0.7;
}

.auth-navbar__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.auth-navbar__link {
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--color-bg);
  text-decoration: none;
  transition: opacity 0.3s var(--ease-smooth);
}

.auth-navbar__link:hover {
  opacity: 0.7;
}

.auth-navbar__logout {
  font-family: var(--font-body);
  font-weight: 500;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s var(--ease-smooth);
}

.auth-navbar__logout:hover {
  color: #dc2626;
}
</style>
