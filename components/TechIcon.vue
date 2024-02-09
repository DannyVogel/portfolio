<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: false,
    default: "i-logos-vue",
  },
});
</script>

<template>
  <UIcon :name="name" dynamic />
</template>
