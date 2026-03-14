import { createRouter, createWebHistory } from 'vue-router'
import { markRaw } from 'vue'
import { authGuard } from '@/middlewares/auth'

import AuthLayout from '@/layouts/AuthLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

import HeroView from '@/components/views/HeroView.vue'
import LoginView from '@/components/views/auth/LoginView.vue'
import RegisterView from '@/components/views/auth/RegisterView.vue'

import Home from '@/components/views/HomeView.vue'
import About from '@/components/views/AboutView.vue'
import BooksPage from '@/components/views/books/BooksView.vue'
import BookPage from '@/components/views/books/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Hero
    {
      path: '/',
      name: 'hero',
      component: markRaw(HeroView),
      meta: { guest: true },
    },
    // Public routes (login/register)
    {
      path: '/login',
      component: PublicLayout,
      meta: { guest: true },
      children: [{ path: '', name: 'login', component: LoginView }],
    },
    {
      path: '/register',
      component: PublicLayout,
      meta: { guest: true },
      children: [{ path: '', name: 'register', component: RegisterView }],
    },
    // Protected route
    {
      path: '/dashboard',
      component: AuthLayout,
      meta: { middleware: [authGuard] },
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'about', name: 'about', component: About },
      ],
    },
    {
      path: '/books',
      component: AuthLayout,
      meta: { middleware: [authGuard] },
      children: [
        { path: '', name: 'books', component: BooksPage },
        { path: ':id', name: 'books.show', component: BookPage },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/auth_store')
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
