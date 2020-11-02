<template>
  <div>
    <h1 class="text-4xl">Dashboard</h1>
    <div class="text-2xl mt-4">Hello, {{ userName }} !</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Dashboard",
  setup() {
    const $store = useStore();
    const userName = computed(() => $store.state.system.userInfo.name);
    return {
      userName,
    };
  },
};
</script>
