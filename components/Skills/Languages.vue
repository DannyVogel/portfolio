<script lang="ts" setup></script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("languages.title") }}</h1>
    <div class="mt-2 flex gap-2 flex-wrap print:hidden">
      <UButton
        :label="$t('languages.EN')"
        color="sky"
        size="xs"
        square
        variant="soft"
        icon="i-noto-v1-flag-for-flag-united-states"
        class="cursor-default"
      />
      <UButton
        :label="$t('languages.ES')"
        color="sky"
        size="xs"
        square
        variant="soft"
        icon="i-noto-v1-flag-for-flag-spain"
        class="cursor-default"
      />
      <UButton
        :label="$t('languages.DE')"
        color="sky"
        size="xs"
        square
        variant="soft"
        icon="i-noto-v1-flag-for-flag-germany"
        class="cursor-default"
      />
      <UButton
        :label="$t('languages.FR')"
        color="sky"
        size="xs"
        square
        variant="soft"
        icon="i-noto-v1-flag-for-flag-france"
        class="cursor-default"
      />
      <UButton
        color="sky"
        size="xs"
        square
        variant="soft"
        class="cursor-default"
      >
        <img src="/img/es-ct.svg" alt="UK" class="w-4 h-4" />
        <p>{{ $t("languages.CA") }}</p>
      </UButton>
    </div>
    <div class="mt-2 hidden print:flex gap-2 flex-wrap">
      <p>English</p>
      <p>Spanish</p>
      <p>German</p>
      <p>French</p>
      <p>Catalan</p>
    </div>
  </div>
</template>
