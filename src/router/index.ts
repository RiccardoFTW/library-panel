import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

import LoginView from '@/components/views/LoginView.vue'
import RegisterView from '@/components/views/RegisterView.vue'

import Home from '@/components/views/HomeView.vue'
import About from '@/components/views/AboutView.vue'
import BooksPage from '@/components/views/books/BooksView.vue'
import BookPage from '@/components/views/books/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: PublicLayout,
      children: [{ path: '', name: 'login', component: LoginView }],
    },
    {
      path: '/register',
      component: PublicLayout,
      children: [{ path: '', name: 'register', component: RegisterView }],
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'about', name: 'about', component: About },
      ],
    },
    {
      path: '/books',
      component: AuthLayout,
      children: [
        { path: '', name: 'books', component: BooksPage },
        { path: ':id', name: 'books.show', component: BookPage },
      ],
    },
  ],
})

export default router
