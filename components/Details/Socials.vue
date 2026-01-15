<script lang="ts" setup>
const socials = [
  {
    icon: "i-ph-envelope-simple",
    link: "contact@danny-v.me",
    tooltipText: "contact.email",
    canCopy: true,
    type: "E-mail",
  },
  {
    icon: "i-ph-linkedin-logo",
    link: "https://www.linkedin.com/in/danny-vogel",
    tooltipText: "contact.linkedin",
    canCopy: false,
    type: "LinkedIn",
  },
  {
    icon: "i-ph-github-logo",
    link: "https://github.com/DannyVogel",
    tooltipText: "contact.github",
    canCopy: false,
    type: "GitHub",
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
  <div>
    <div class="flex gap-2 print:hidden">
      <template
        v-for="social in socials"
        :key="social.link"
      >
        <UTooltip :text="$t(social.tooltipText)">
          <UButton
            color="info"
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
    <div class="hidden print:flex flex-col">
      <template
        v-for="social in socials"
        :key="social"
      >
        <p class="text-sm">
          {{ social.type }}:
          {{ social.link }}
        </p>
      </template>
    </div>
  </div>
</template>
