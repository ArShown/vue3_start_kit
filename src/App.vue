<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { defaultTo, path, toUpper, head, tail } from "ramda";

export default {
  computed: {
    layout() {
      const currentLayout = defaultTo("default")(
        path(["meta", "layout"], this.$route)
      );

      return (
        toUpper(head(`${currentLayout}Layout`)) + tail(`${currentLayout}Layout`)
      );
    },
  },
};
</script>
