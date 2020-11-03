<template>
  <div>Menu - {{ currentMenu }}</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  breadcrumb: [
    {
      path: "/nested/1",
      title: "Nested",
    },
    (state) => ({
      path: state.route.fullPath,
      title: `Menu - ${state.route.params.menu || 0}`,
    }),
  ],
  setup() {
    const $store = useStore();
    const currentMenu = computed(() => $store.state.route.params.menu);
    return {
      currentMenu,
    };
  },
};
</script>
