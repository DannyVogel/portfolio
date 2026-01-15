<script lang="ts" setup>
const languages = {
  english: {
    locale: "EN",
    icon: "i-noto-v1-flag-for-flag-united-states",
  },
  spanish: {
    locale: "ES",
    icon: "i-noto-v1-flag-for-flag-spain",
  },
  german: {
    locale: "DE",
    icon: "i-noto-v1-flag-for-flag-germany",
  },
  french: {
    locale: "FR",
    icon: "i-noto-v1-flag-for-flag-france",
  },
};
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("languageSkills.title") }}</h1>
    <div class="mt-2 flex gap-2 flex-wrap print:hidden">
      <template v-for="(language, key) in languages" :key="key">
        <UButton
          :label="$t(`languageSkills.${language.locale}`)"
          color="info"
          size="xs"
          square
          variant="soft"
          :icon="language.icon"
          class="cursor-default"
        />
      </template>
      <UButton
        color="info"
        size="xs"
        square
        variant="soft"
        class="cursor-default"
      >
        <img src="/img/es-ct.svg" alt="UK" class="w-4 h-4" />
        <p>{{ $t("languageSkills.CA") }}</p>
      </UButton>
    </div>
    <div class="mt-2 hidden print:flex gap-2 flex-wrap">
      <template v-for="(language, key) in languages" :key="key">
        <p>{{ $t(`languageSkills.${language.locale}`) }}</p>
      </template>
      <p>{{ $t("languageSkills.CA") }}</p>
    </div>
  </div>
</template>
