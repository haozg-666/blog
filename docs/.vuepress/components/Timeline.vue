<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { usePages as usePagesGuide } from '@temp/page-guide';
import { usePages as usePagesCss } from '@temp/page-css';
import { usePages as usePagesJs } from '@temp/page-js';
import { usePages as usePagesHtml } from '@temp/page-html';
const headers = ref([]);

const router = inject('router');
const route = inject('route');

onMounted(() => {
  const page = usePageData();
  console.log('usePagesGuide', usePagesGuide());
  console.log('usePagesCss', usePagesCss());
  console.log('usePagesJs', usePagesJs());
  console.log('usePagesHtml', usePagesHtml());
  console.log('page', page);
  console.log('readingTime', page.value.readingTime);
  console.log('git', page.value.git);
  // headers.value = page.value.headers;
});
</script>

<template>
  <div>
    timeline
  </div>
</template>
