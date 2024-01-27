<script lang="ts" setup>
const socials = [
  {
    icon: "i-ph-envelope-simple",
    link: "danny.vogel@live.com",
    tooltipText: "contact.email",
  },
  {
    icon: "i-ph-linkedin-logo",
    link: "https://www.linkedin.com/in/danny-vogel",
    tooltipText: "contact.linkedin",
  },
  {
    icon: "i-ph-github-logo",
    link: "https://github.com/DannyVogel",
    tooltipText: "contact.github",
  },
];
</script>

<template>
  <div class="flex gap-2">
    <template v-for="social in socials" :key="social">
      <UTooltip :text="$t(social.tooltipText)">
        <UButton
          color="teal"
          size="sm"
          square
          variant="outline"
          :icon="social.icon"
          :href="social.link"
        />
      </UTooltip>
    </template>
  </div>
</template>
