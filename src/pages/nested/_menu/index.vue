<template>
  <div>Menu - {{ currentMenu }}</div>
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
      path: route.fullPath,
      title: `Menu - ${route.params.menu || 0}`,
    }),
  ],
  setup() {
    const route = useRoute();
    const currentMenu = computed(() => route.params.menu);
    return {
      currentMenu,
    };
  },
};
</script>
