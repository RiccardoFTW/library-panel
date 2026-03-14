import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { isAuthenticated } from '@/services/AuthService'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  if (!isAuthenticated() && to.meta.requiresAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
}
