<script setup lang="ts">
import AuthNavbar from '@/components/molecules/AuthNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)]">
    <AuthNavbar />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>
