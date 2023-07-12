<script setup>
const props = defineProps({
  menuInfo: {
    type: Object,
    default: true,
  },
  hash: {
    type: String,
    default: ''
  }
});
</script>
<template>
  <li :class="[
      'anchor-list-level',
      'anchor-list-level-'+props.menuInfo.level,
      { active: hash === `#${props.menuInfo.slug}` },
    ]">
    <div>
      <a class="anchor-list-level-a" :href="`#${props.menuInfo.slug}`">{{ props.menuInfo.title }}</a>
    </div>
    <ul class="anchor-list-menu">
      <template v-for="(item, index) in props.menuInfo.children" :key="index">
        <page-toc-sub-menu
            :key="item.key"
            :menu-info="item"
            :route="route"
            :router="router"
            v-if="item.children.length > 0 && item.level!== 3"/>

        <li v-else
            :class="['anchor-list-level', 'anchor-list-level-'+item.level,  { active: hash === `#${item.slug}` }]">
          <a class="anchor-list-level-a" :href="`#${item.slug}`">{{ item.title }}</a>
        </li>
      </template>
    </ul>
  </li>
</template>
