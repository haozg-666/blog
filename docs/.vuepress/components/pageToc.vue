<script setup lang="ts">
import {defineEmits, computed, ref} from "vue";
import {useRoute} from 'vue-router';
import { usePageData } from '@vuepress/client';

const emit = defineEmits(['tocLength'])

const route = useRoute();
const page = usePageData();
let baseLevel = ref(1);
const headers = computed(() => {
  const headersValue = page.value.headers;
  emit('tocLength', headersValue);
  baseLevel.value = headersValue.length ? headersValue[0].level : 1;
  return headersValue;
});
</script>

<template>
  <nav class="g-toc-wrap">
    <ul class="g-toc">
      <template v-for="(item, index) in headers" :key="index">
        <template v-if="item.children.length > 0">
          <page-toc-sub-menu :key="item.key" :menu-info="item" :hash="route.hash" :baseLevel="baseLevel" />
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
