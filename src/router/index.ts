import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/views/LoginView.vue'
import RegisterView from '@/components/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'RegistrationPage',
      component: RegisterView,
    },
  ],
})

export default router
