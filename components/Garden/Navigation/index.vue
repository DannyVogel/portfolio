<script lang="ts" setup>
const open = ref(false);
const { data } = await useAsyncData(
  "navigation",
  () => {
    return queryCollectionNavigation("content").where("path", "NOT LIKE", "/");
  },
  {
    transform: (data) => {
      return data.map((item) => {
        if (item.title === "Ai") item.title = "AI";
        if (item.title === "Typescript") item.title = "TypeScript";
        return {
          label: item.title,
          items: item.children?.map((child) => {
            return {
              label: child.title,
              to: `/garden${child.path}`,
            };
          }),
        };
      });
    },
    default: () => {
      return [];
    },
  }
);

// Transform data for UDropdown format
const dropdownItems = computed(() => {
  return data.value.map((section) => [
    {
      label: section.label,
      items: section.items,
    },
  ]);
});
</script>

<template>
  <nav>
    <div class="block sm:hidden">
      <!-- TODO: use USlideover -->
    </div>
    <div class="hidden sm:block">
      <UAccordion
        :items="data"
        color="white"
        variant="ghost"
        class="hidden sm:block"
      >
        <template #item="{ item }">
          <template v-if="item.items">
            <GardenNavigationItems :items="item.items" />
          </template>
        </template>
      </UAccordion>
    </div>
  </nav>
</template>
