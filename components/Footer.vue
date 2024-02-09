<script lang="ts" setup>
const { locale, messages } = useI18n();
const languages = Object.keys(messages.value);
</script>

<template>
  <div
    class="fixed bottom-4 md:bottom-8 print:hidden mx-auto left-0 right-0 flex w-full max-w-3xl px-6 md:px-10"
  >
    <UPopover class="ml-auto" :popper="{ placement: 'top-end' }">
      <UButton
        color="sky"
        size="sm"
        square
        variant="outline"
        icon="i-heroicons-globe-alt"
        class="bg-slate-900"
      />

      <template #panel="{ close }">
        <div class="p-5 grid grid-cols-2 gap-x-2">
          <template v-for="lang in languages" :key="lang">
            <p
              class="cursor-pointer hover:text-sky-500 py-1"
              :class="
                locale === lang ? ' text-sky-500 font-bold' : ' text-gray-500'
              "
              @click="
                () => {
                  locale = lang;
                  close();
                }
              "
            >
              {{ $t(`languages.${lang}`) }}
            </p>
          </template>
        </div>
      </template>
    </UPopover>
  </div>
</template>
