<script setup>
import SidebarItems from '@vuepress/theme-default/components/SidebarItems.vue'
</script>

<template>
  <div class="auto-catalog">
    <h2>目录</h2>
    <SidebarItems class="auto-catalog-inner" />
  </div>
</template>

<style lang="scss">
.auto-catalog {
  .auto-catalog-inner {

    >li:first-child {
      display: none;
    }

    .sidebar-item {
      padding-left: 0;
      &:not(.sidebar-heading) {
        color: var(--c-text-accent);
      }
    }

    .sidebar-heading {
      pointer-events: none;
    }

    .sidebar-item-children {
      height: auto !important;
      display: block !important;
    }
    .arrow {
      display: none;
    }
  }
}
</style>