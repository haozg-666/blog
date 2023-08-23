<script setup>
const props = defineProps({
  menuInfo: {
    type: Object,
    default: true,
  },
  hash: {
    type: String,
    default: ''
  },
  baseLevel: {
    type: Number,
    default: 1
  }
});
</script>
<template>
  <li :class="[
      'g-toc-level',
      'g-toc-level-'+props.menuInfo.level,
      { active: hash === `#${props.menuInfo.slug}` },
    ]">
      <a class="g-toc-link"
         :style="{'padding-left': `${ Math.max(0, props.menuInfo.level + 1 - baseLevel) * 8}px`}"
         :href="`#${props.menuInfo.slug}`">{{ props.menuInfo.title }}</a>
    <ul class="g-toc-menu">
      <template v-for="(item, index) in props.menuInfo.children" :key="index">
        <page-toc-sub-menu
            :key="item.key"
            :menu-info="item"
            :hash="hash"
            v-if="item.children.length > 0"/>
        <li v-else
            :class="['g-toc-level', 'g-toc-level-'+item.level,  { active: hash === `#${item.slug}` }]">
          <a class="g-toc-link"
             :style="{'padding-left': `${ Math.max(0, item.level + 1 - baseLevel) * 8}px`}"
             :href="`#${item.slug}`">{{ item.title }}</a>
        </li>
      </template>
    </ul>
  </li>
</template>
