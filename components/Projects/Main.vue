<script lang="ts" setup>
const projects = [
  {
    title: "InvictoAI",
    link: "https://invicto.netlify.app/",
    description: "projectsList.InvictoAI.description",
    logo: "/img/invicto.png",
    techStack: {
      Nuxt: "i-logos-nuxt-icon",
      TypeScript: "i-logos-typescript-icon",
      TailwindCSS: "i-logos-tailwindcss-icon",
      Supabase: "i-logos-supabase-icon",
    },
  },
  {
    title: "gameState",
    link: "https://dv-gamestate.netlify.app/",
    description: "projectsList.gameState.description",
    logo: "/img/gameState.png",
    techStack: {
      Nuxt: "i-logos-nuxt-icon",
      TypeScript: "i-logos-typescript-icon",
      TailwindCSS: "i-logos-tailwindcss-icon",
      Firebase: "i-logos-firebase",
    },
  },
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
  {
    title: "SoundScribe",
    link: "https://dv-soundscribe.netlify.app/",
    description: "projectsList.SoundScribe.description",
    logo: "/img/soundScribe.png",
    techStack: {
      Vue: "i-logos-vue",
      TailwindCSS: "i-logos-tailwindcss-icon",
      TypeScript: "i-logos-typescript-icon",
    },
  },
  {
    title: "ToDo",
    link: "https://todo-2f3e3.web.app/",
    description: "projectsList.toDo.description",
    logo: "/img/toDo.png",
    techStack: {
      React: "i-logos-react",
      TypeScript: "i-logos-typescript-icon",
      Firebase: "i-logos-firebase",
    },
  },
];
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("projects") }}</h1>
    <div class="mt-4 flex flex-col gap-6">
      <template
        v-for="project in projects"
        :key="project.title"
      >
        <div class="flex items-start gap-2">
          <a
            :href="project.link"
            target="_blank"
            class="hover:scale-110 transform transition-transform duration-300 w-8 h-8 rounded-full flex-shrink-0 flex items-start justify-center"
          >
            <img
              :src="project.logo"
              alt="logo"
              class=""
          /></a>
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
              <template
                v-for="(icon, key) in project.techStack"
                :key="key"
              >
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
