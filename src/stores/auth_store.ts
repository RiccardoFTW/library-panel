import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as AuthService from '@/services/AuthService'
import type { LoginData, SignupData, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value || AuthService.isAuthenticated())

  async function login(loginData: LoginData) {
    const res = await AuthService.login(loginData)
    try {
      user.value = await AuthService.getMe()
    } catch {
      // Token salvato ma /me fallita: l'utente è comunque autenticato
    }
    return res
  }

  async function logout() {
    await AuthService.logout()
    user.value = null
  }

  async function signup(signupData: SignupData) {
    return AuthService.signup(signupData)
  }

  async function fetchUser() {
    if (!AuthService.isAuthenticated()) return
    try {
      user.value = await AuthService.getMe()
    } catch {
      user.value = null
    }
  }

  return { user, isAuthenticated, login, logout, signup, fetchUser }
})
