<script setup lang="ts">
import {computed} from "vue";
import {
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import {DefaultThemeHomePageFrontmatter} from "@vuepress/theme-default/lib/shared";

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();

const heroImage = computed(() => {
  return frontmatter.value.heroImage
})
</script>

<template>
  <main class="home2">
    <div class="first">
      <div class="first-inner">
        <img class="img" :src="heroImage" alt="">
        <div class="radial">种一棵树最好的时间是十年前<br>其次就是现在</div>
        <img class="github-image" src="https://ghchart.rshah.org/haozg-666" alt="我的 GitHub 贡献图" />
      </div>
    </div>
  </main>
</template>
