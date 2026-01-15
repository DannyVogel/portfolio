<script lang="ts" setup>
const { isGraphOpen } = useAppState();
</script>

<template>
  <UModal v-model:open="isGraphOpen">
    <GardenGraph />
  </UModal>
</template>
