<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { logout } = useAuth()

const navItems = [
  { label: 'Catalogo', routeName: 'catalog' },
  { label: 'Statistiche', routeName: 'about' },
  { label: 'Membri', routeName: 'books' },
] as const

const currentRouteName = computed(() => String(router.currentRoute.value.name ?? ''))

const goToRoute = (routeName: string) => {
  if (!router.hasRoute(routeName)) return
  router.push({ name: routeName })
}

const signout = async () => {
  try {
    await logout()
  } catch (error) {
    console.warn('Logout request failed, forcing local signout', error)
  } finally {
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <nav class="auth-navbar">
    <div class="auth-navbar__links">
      <button
        type="button"
        class="auth-navbar__link auth-navbar__link--brand"
        @click="goToRoute('home')"
      >
        {{ t('common.library') }}
      </button>
      <div class="auth-navbar__menu">
        <button
          v-for="item in navItems"
          :key="item.label"
          type="button"
          class="auth-navbar__link"
          :class="{ 'auth-navbar__link--active': currentRouteName === item.routeName }"
          @click="goToRoute(item.routeName)"
        >
          {{ item.label }}
        </button>
      </div>
      <button type="button" class="auth-navbar__logout" @click="signout">
        {{ t('common.logout') }}
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.auth-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 60;
  background: var(--surface-card);
  border-bottom: 1px solid var(--border-subtle);

  &__links {
    width: 100%;
    max-width: none;
    min-height: calc(3.25rem + var(--space-2));
    padding: var(--space-2) var(--space-4);
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-width: 0;
  }

  &__link {
    font-family: var(--font-body);
    font-weight: 500;
    letter-spacing: -0.05em;
    color: var(--text-secondary);
    text-decoration: none;
    border: none;
    background: transparent;
    border-radius: var(--radius-control);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &--brand {
      flex-shrink: 0;
      font-family: var(--font-display);
      font-weight: 600;
      letter-spacing: -0.02em;
      font-size: 1.08rem;
      color: var(--text-primary);
    }

    &--active {
      background: var(--accent-secondary);
      color: var(--text-primary);
    }

    &:hover {
      background: var(--surface-muted);
      color: var(--text-primary);
    }
  }

  &__logout {
    flex-shrink: 0;
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-secondary);
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-control);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background: var(--danger);
      color: var(--surface-card);
    }
  }
}

@media (max-width: 920px) {
  .auth-navbar {
    &__links {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      min-height: calc(3rem + var(--space-3));
      justify-content: flex-start;
    }

    &__links::-webkit-scrollbar {
      display: none;
    }

    &__menu {
      flex: 0 1 auto;
      justify-content: flex-start;
    }

    &__logout {
      margin-left: auto;
    }
  }
}
</style>
