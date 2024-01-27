<script lang="ts" setup></script>

<template>
  <div class="min-h-screen bg-slate-900 font-kanit text-white">
    <div class="container mx-auto max-w-3xl p-6 pb-16 md:p-10 md:pb-32">
      <Header />
      <slot />
      <Footer />
    </div>
  </div>
</template>
