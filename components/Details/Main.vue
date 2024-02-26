<script lang="ts" setup></script>

<template>
  <div class="flex gap-4 items-center sm:items-start">
    <div class="flex flex-col justify-center gap-2 mr-auto">
      <h1 class="text-3xl">Danny Vogel</h1>

      <h1 class="text-xl">{{ $t("title") }}</h1>

      <p class="hidden sm:block text-sm max-w-xs print:max-w-full">
        {{ $t("description") }}
      </p>
      <DetailsSocials />
    </div>
    <img
      src="/img/me.png"
      alt="Danny Vogel"
      width="150"
      class="hidden sm:block print:block"
    />
    <img
      src="/img/me.png"
      alt="Danny Vogel"
      width="120"
      class="sm:hidden print:hidden"
    />
  </div>
  <p class="sm:hidden text-sm">{{ $t("description") }}</p>
</template>
