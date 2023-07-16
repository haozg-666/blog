<script setup lang="ts">
import { onUnmounted, onMounted, ref, computed } from "vue";
import { usePageData } from '@vuepress/client';
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import PageToc from "../components/pageToc.vue";

const page = usePageData();

const readingTime = computed(() => {
  const m = page.value.readingTime.minutes;
  return m < 1 ? '小于 1 分钟' : `大约 ${Math.floor(m)} 分钟`;
});
const showReadingTime = computed(() => {
  const show = page.value.frontmatter.readingTime;
  return typeof show === 'undefined' ? true : show;
});

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
      <ul class="page-info">
        <li class="page-info-item" v-if="showReadingTime">
          <label>阅读时间：</label>
          <span v-text="readingTime"></span>
        </li>
      </ul>
    </template>
    <template #page-bottom>
      <comment-service :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
