<template>
  <div>
    <div>Menu - {{ currentMenu }}</div>
    <div>Submenu - {{ currentSubmenu }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  breadcrumb: [
    {
      path: "/nested",
      title: "Nested",
    },
    (state) => ({
      path: `/nested/${state.route.params.menu}`,
      title: `Menu - ${state.route.params.menu}`,
    }),
    (state) => ({
      path: state.route.fullPath,
      title: `Submenu - ${state.route.params.submenu}`,
    }),
  ],
  setup() {
    const $store = useStore();
    const currentMenu = computed(() => $store.state.route.params.menu);
    const currentSubmenu = computed(() => $store.state.route.params.submenu);
    return {
      currentMenu,
      currentSubmenu,
    };
  },
};
</script>
