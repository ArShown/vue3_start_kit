<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { isNil, defaultTo } from "ramda";

export default {
  setup() {
    const route = useRoute();
    const layout = computed(() => {
      /* 一開始都是 undefined */
      if (isNil(route.path)) return null;
      /* 拿設定的 layout，預設是 default-layout */
      const currentLayout = defaultTo("layout-error")(route.meta.layout);
      return currentLayout;
    });

    return {
      layout,
    };
  },
};
</script>
