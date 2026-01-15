<script lang="ts" setup>
const jobs = [
  {
    company: "FlirtVentures",
    companyLink: "https://flirtventures.com",
    title: "jobs.FlirtVentures.title",
    date: "jobs.FlirtVentures.date",
    description: "jobs.FlirtVentures.description",
    logo: "/img/flirtventures_logo.jpeg", 
  },
  {
    company: "Games for a Living",
    companyLink: "https://gfal.com",
    title: "jobs.GFAL.title",
    date: "jobs.GFAL.date",
    description: "jobs.GFAL.description",
    logo: "/img/gfal_logo.jpeg",
    projectName: "GFAL Marketplace",
    projectLink: "https://gfal.market",
  },
  {
    company: "Chingu",
    companyLink: "https://chingu.io",
    title: "jobs.Chingu.title",
    date: "jobs.Chingu.date",
    description: "jobs.Chingu.description",
    logo: "/img/chingu_logo.png",
    projectName: "Chingu Voyage 43 Project: Crypto Dashboard",
    projectLink: "https://v43-tier2-team-13-ef7o.vercel.app/dashboard",
  },
];
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("workExperience") }}</h1>
    <div class="mt-4 flex flex-col gap-6">
      <template v-for="job in jobs" :key="job.company">
        <div class="flex items-start gap-2">
          <img :src="job.logo" alt="logo" class="w-8 h-8 rounded-full" />
          <div class="flex flex-col justify-start gap-1">
            <h1 class="-mt-1 leading-none">
              <a
                :href="job.companyLink"
                target="_blank"
                class="hover:underline hover:text-blue-600"
                >{{ job.company }}</a
              >
            </h1>
            <div class="flex flex-col sm:flex-row sm:gap-2">
              <h2 class="">{{ $t(job.title) }}</h2>
              <p class="hidden sm:block">•</p>
              <h2 class="text-gray-400">{{ $t(job.date) }}</h2>
            </div>
            <p class="text-sm text-gray-400">{{ $t(job.description) }}</p>
            <a
              v-if="job.projectName"
              :href="job.projectLink"
              target="_blank"
              class="text-sm text-blue-500 underline hover:text-blue-600"
              >{{ job.projectName }}</a
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
