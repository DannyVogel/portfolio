<script lang="ts" setup>
// import { chatModel } from "~/utils";

// const askGpt = async () => {
//   try {
//     const res = await chatModel.invoke("List all red berries");
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
</script>

<template>
  <div class="mt-4 flex flex-col gap-6">
    <DetailsMain />
    <SkillsMain />
    <WorkMain />
    <ProjectsMain />
    <!-- <UButton @click="askGpt">Ask GPT-3</UButton> -->
  </div>
</template>
