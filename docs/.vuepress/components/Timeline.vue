<script setup lang="ts">
import { ref } from "vue";
import { usePageData, withBase } from '@vuepress/client';

import { usePages as usePagesGuide } from '@temp/page-guide';
import { usePages as usePagesCss } from '@temp/page-css';
import { usePages as usePagesJs } from '@temp/page-js';
import { usePages as usePagesHtml } from '@temp/page-html';
const headers = ref([]);
const all = ref([]);

const page = usePageData();

const times = [...usePagesGuide(), ...usePagesCss(), ...usePagesJs(), ...usePagesHtml()].sort((a, b) => b.git.updatedTime - a.git.updatedTime);
times.forEach(i => {
  const date = new Date(i.git.updatedTime);
  const year = date?.getFullYear();
  const month = date ? date.getMonth() + 1 : null;
  const day = date?.getDate();
  if (year && month && day) {
    if (!all.value[0] || all.value[0].year !== year) {
      all.value.unshift({ year, items: [] });
    }
    all.value[0].items.push({
      date: `${month}/${day}`,
      title: i.title,
      path: withBase(i.path),
    });
  }
})

</script>

<template>
  <div class="g-timeline-wrap">
    <ul class="g-timeline">
      <li class="g-timeline-item title"
          v-for="item of all"
          :key="item.year">
        <span class="g-timeline-title" v-text="item.year"></span>
        <ul class="g-timeline">
          <li class="g-timeline-item"
              v-for="itemC of item.items"
              :key="item.key">
            <span class="g-timeline-date" v-text="itemC.date"></span>
            <a class="g-timeline-link" :href="itemC.path" v-text="itemC.title || '--'"></a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
