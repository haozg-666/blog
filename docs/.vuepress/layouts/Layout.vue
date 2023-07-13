<script setup lang="ts">
import { onUnmounted, onMounted, ref } from "vue";
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import PageToc from "../components/pageToc.vue";

const isDarkMode = ref(false);

const hasGToc = ref(false);
function tocLength(len) {
  hasGToc.value = !!len;
}

onMounted(() => {
  const html = document.documentElement;

  isDarkMode.value = html.classList.contains("dark");

  // watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains("dark");
  });

  observer.observe(html, {
    attributeFilter: ["class"],
    attributes: true,
  });

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <ParentLayout :class="{hasGToc}">
    <template #page-content-top>
      <page-toc @toc-length="tocLength" />
    </template>
    <template #page-bottom>
      <comment-service :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
