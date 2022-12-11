<template>
  <div>
    <div>Menu - {{ currentMenu }}</div>
    <div>Submenu - {{ currentSubmenu }}</div>
    <div>Last Menu - {{ currentLastMenu }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  breadcrumb: [
    {
      path: "/nested/1",
      title: "Nested",
    },
    (state, route) => ({
      path: `/nested/${route.params.menu}`,
      title: `Menu - ${route.params.menu || 0}`,
    }),
    (state, route) => ({
      path: `/nested/${route.params.menu}/${route.params.submenu}`,
      title: `Submenu - ${route.params.submenu || 0}`,
    }),
    (state, route) => ({
      path: route.fullPath,
      title: `Last Menu - ${route.params.lastmenu || 0}`,
    }),
  ],
  setup() {
    const route = useRoute();
    const currentMenu = computed(() => route.params.menu);
    const currentSubmenu = computed(() => route.params.submenu);
    const currentLastMenu = computed(() => route.params.lastmenu);
    return {
      currentMenu,
      currentSubmenu,
      currentLastMenu,
    };
  },
};
</script>
