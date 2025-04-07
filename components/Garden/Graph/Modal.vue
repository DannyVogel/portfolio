<script lang="ts" setup>
const { isGraphOpen } = useAppState();
</script>

<template>
  <UModal v-model="isGraphOpen">
    <GardenGraph />
  </UModal>
</template>
