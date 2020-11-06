<template>
  <div ref="scrollbar" class="relative w-full h-full overflow-hidden">
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

export default {
  name: "Scrollbar",
  setup() {
    const scrollbar = ref();
    onMounted(() => {
      new PerfectScrollbar(scrollbar.value);
    });
    return {
      scrollbar,
    };
  },
};
</script>

<style scoped></style>
