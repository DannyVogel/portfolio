<script lang="ts" setup></script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ $t("techAndTools") }}</h1>
    <div class="mt-2 flex gap-2 flex-wrap print:hidden">
      <UButton
        label="TypeScript"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-typescript-icon"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="VueJS"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-vue"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Nuxt"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-nuxt-icon"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="React"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-react"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Pinia"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-pinia"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Tailwind"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-tailwindcss-icon"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Firebase"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-firebase"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="ViteJS"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-vitejs"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="HTML5"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-html-5"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="CSS3"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-css-3"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Git"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-logos-git-icon"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Agile/Scrum"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-heroicons-user-group"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Jira"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-ph-list-checks"
        class="cursor-default flex-shrink-0"
      />
      <UButton
        label="Kanban"
        color="info"
        size="xs"
        square
        variant="soft"
        icon="i-ph-kanban-duotone"
        class="cursor-default flex-shrink-0"
      />
    </div>
    <div class="mt-2 hidden print:flex gap-2 flex-wrap">
      <p>TypeScript</p>
      <p>VueJS</p>
      <p>Nuxt</p>
      <p>React</p>
      <p>Pinia</p>
      <p>Tailwind</p>
      <p>Firebase</p>
      <p>ViteJS</p>
      <p>HTML5</p>
      <p>CSS3</p>
      <p>Git</p>
      <p>Agile/Scrum</p>
      <p>Jira</p>
      <p>Kanban</p>
    </div>
  </div>
</template>
