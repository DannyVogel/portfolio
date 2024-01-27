<script lang="ts" setup></script>

<template>
  <div class="flex gap-4 items-center">
    <div class="flex flex-col gap-2 mr-auto">
      <h1 class="text-3xl">Danny Vogel</h1>

      <h1 class="text-xl">{{ $t("title") }}</h1>

      <p class="text-sm">{{ $t("description") }}</p>
      <DetailsSocials />
    </div>
    <img src="/img/me.png" alt="Danny Vogel" width="150" />
  </div>
</template>
