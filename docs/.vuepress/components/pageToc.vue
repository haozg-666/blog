<script setup lang="ts">
import { defineEmits, computed, toRaw, getCurrentInstance } from "vue";
import {useRoute} from 'vue-router';
import { usePageData } from '@vuepress/client';

const emit = defineEmits(['tocLength'])

const route = useRoute();
console.log(111, toRaw(route))
console.log(222, getCurrentInstance().proxy.$route)
const page = usePageData();
const headers = computed(() => {
  emit('tocLength', page.value.headers);
  return page.value.headers;
});
</script>

<template>
  <nav class="g-toc-wrap">
    <ul class="g-toc">
      <template v-for="(item, index) in headers" :key="index">
        <template v-if="item.children.length > 0">
          <page-toc-sub-menu :key="item.key" :menu-info="item" :hash="route.hash" />
        </template>
        <template v-else>
          <li :class="['g-toc-level', 'g-toc-level-'+item.level, { active: route.hash === `#${item.slug}` }]">
            <a class="g-toc-link" :href="`#${item.slug}`">{{ item.title }}</a>
          </li>
        </template>
      </template>
    </ul>
  </nav>
</template>
