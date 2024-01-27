<script lang="ts" setup>
const socials = [
  {
    icon: "i-ph-envelope-simple",
    link: "danny.vogel@live.com",
    tooltipText: "contact.email",
    canCopy: true,
  },
  {
    icon: "i-ph-linkedin-logo",
    link: "https://www.linkedin.com/in/danny-vogel",
    tooltipText: "contact.linkedin",
    canCopy: false,
  },
  {
    icon: "i-ph-github-logo",
    link: "https://github.com/DannyVogel",
    tooltipText: "contact.github",
    canCopy: false,
  },
];

const toast = useToast();
const { t } = useI18n();
const copyToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.add({
    title: `${t("copied")}`,
    icon: "i-heroicons-check-circle",
  });
};

const openLink = (link: string) => {
  window.open(link, "_blank");
};
</script>

<template>
  <div class="flex gap-2">
    <template v-for="social in socials" :key="social">
      <UTooltip :text="$t(social.tooltipText)">
        <UButton
          color="sky"
          size="sm"
          square
          variant="outline"
          :icon="social.icon"
          :href="social.link"
          @click="
            social.canCopy
              ? copyToClipBoard(social.link)
              : openLink(social.link)
          "
        />
      </UTooltip>
    </template>
  </div>
</template>
