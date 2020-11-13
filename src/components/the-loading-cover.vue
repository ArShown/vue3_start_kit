<template>
  <transition name="fade">
    <div
      v-if="hasLoadingAPIs"
      class="fixed right-0 top-0 flex justify-center items-center flex-col p-4"
    >
      <h3
        class="animate-spin border-2 border-gray-100 w-4 h-4 rounded-full"
        style="border-top-color: transparent"
      ></h3>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const hasLoadingAPIs = computed(
      () => $store.state.system.loadingAPIs.length > 0
    );
    return {
      hasLoadingAPIs,
    };
  },
};
</script>
