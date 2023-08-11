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
        <img class="img" :src="withBase(heroImage)" alt="">
        <typing-text text="种一棵树最好的时间是十年前 其次就是现在"></typing-text>
<!--        <div class="radial">种一棵树最好的时间是十年前<br>其次就是现在</div>-->
        <img class="github-image" src="https://ghchart.rshah.org/ahaozg" alt="我的 GitHub 贡献图" />
      </div>
    </div>
    <div class="inner"></div>
  </main>
</template>
