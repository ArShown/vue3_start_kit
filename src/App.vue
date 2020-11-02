<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
  <TheLoadingCover />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { isNil, defaultTo, path } from "ramda";

export default {
  setup() {
    const $store = useStore();
    const key = computed(() => $store.state.route.path);
    const layout = computed(() => {
      /* 一開始都是 undefined */
      if (isNil($store.state.route.path)) return null;
      /* 拿設定的 layout，預設是 default-layout */
      const currentLayout = defaultTo("default")(
        path(["meta", "layout"], $store.state.route)
      );
      return `${currentLayout}-layout`;
    });

    return {
      key,
      layout,
    };
  },
};
</script>
