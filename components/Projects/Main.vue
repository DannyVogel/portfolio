<script lang="ts" setup>
const projects = [
  {
    title: "SignWise",
    link: "https://www.youtube.com/watch?v=Gznc_BwetM4&ab_channel=SignWiseTeam",
    description: "projectsList.SignWise.description",
    logo: "/img/SWIcon.png",
    techStack: {
      Nuxt: "i-logos-nuxt-icon",
      TailwindCSS: "i-logos-tailwindcss-icon",
      TypeScript: "i-logos-typescript-icon",
      Blockchain: "i-eos-icons-blockchain",
    },
  },
];
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("projects") }}</h1>
    <div class="mt-2 flex flex-col gap-4">
      <template v-for="project in projects" :key="project.title">
        <div class="flex items-start gap-2">
          <img :src="project.logo" alt="logo" class="w-8 h-8 rounded-full" />
          <div class="flex flex-col justify-start gap-1">
            <h1 class="-mt-1 leading-none">
              <a
                :href="project.link"
                target="_blank"
                class="hover:underline hover:text-blue-600"
                >{{ project.title }}</a
              >
            </h1>
            <p class="text-sm text-gray-400">{{ $t(project.description) }}</p>
            <div class="flex gap-2">
              <template v-for="(icon, key) in project.techStack" :key="key">
                <UTooltip :text="key">
                  <TechIcon :name="icon" />
                </UTooltip>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
