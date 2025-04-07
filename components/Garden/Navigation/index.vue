<script lang="ts" setup>
const { isOpen } = useAppState();
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
      <USlideover v-model="isOpen">
        <div class="pl-4 pr-2 py-4 flex justify-between">
          <h1 class="text-2xl font-bold">Digital Garden</h1>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            square
            padded
            @click="isOpen = false"
          />
        </div>
        <div class="px-4">
          <UAccordion
            :items="data"
            color="white"
            variant="ghost"
          >
            <template #item="{ item }">
              <template v-if="item.items">
                <GardenNavigationItems :items="item.items" />
              </template>
            </template>
          </UAccordion>
        </div>
      </USlideover>
    </div>
    <div class="hidden sm:block">
      <UAccordion
        :items="data"
        color="white"
        variant="ghost"
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
