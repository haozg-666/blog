<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRoute} from 'vue-router';
import { usePageData } from '@vuepress/client';

const route = useRoute();
const headers = ref([]);

onMounted(() => {
  const page = usePageData();
  headers.value = page.value.headers;
});
</script>

<template>
  <aside class="page-anchor">
    <ul class="anchor-list">
      <template v-for="(item, index) in headers" :key="index">
        <template v-if="item.children.length > 0">
          <page-toc-sub-menu :key="item.key" :menu-info="item" :hash="route.hash" />
        </template>
        <template v-else>
          <li :class="['anchor-list-level', 'anchor-list-level-'+item.level, { active: route.hash === `#${item.slug}` }]">
            <a class="anchor-list-level-a" :href="`#${item.slug}`">{{ item.title }}</a>
          </li>
        </template>
      </template>
    </ul>
  </aside>
</template>
