import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const isLogged = !!localStorage.getItem('token')

  if (!isLogged && to.meta.requiresAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
}
