<script setup lang="ts">
import PublicNavbar from '../molecules/PublicNavbar.vue'
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#f5f7fa_0%,#c3cfe2_100%)]"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl overflow-hidden">
        <PublicNavbar />
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
