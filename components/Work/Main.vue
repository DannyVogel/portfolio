<script lang="ts" setup>
const jobs = [
  {
    company: "Games for a Living",
    title: "jobs.GFAL.title",
    date: "jobs.GFAL.date",
    description: "jobs.GFAL.description",
    logo: "/img/gfal_logo.jpeg",
  },
  {
    company: "Chingu",
    title: "jobs.Chingu.title",
    date: "jobs.Chingu.date",
    description: "jobs.Chingu.description",
    logo: "/img/chingu_logo.png",
  },
];
</script>

<template>
  <div>
    <h1>{{ $t("workExperience") }}</h1>
    <div class="mt-2 flex flex-col gap-4">
      <template v-for="job in jobs" :key="job.company">
        <div class="flex items-start gap-2">
          <img :src="job.logo" alt="logo" class="w-8 h-8" />
          <div class="flex flex-col justify-start gap-1">
            <h1 class="-mt-1 leading-none">{{ job.company }}</h1>
            <div class="flex flex-col sm:flex-row sm:gap-2">
              <h2 class="">{{ $t(job.title) }}</h2>
              <p class="hidden sm:block">•</p>
              <h2 class="">{{ $t(job.date) }}</h2>
            </div>
            <p class="text-sm text-gray-400">{{ $t(job.description) }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
