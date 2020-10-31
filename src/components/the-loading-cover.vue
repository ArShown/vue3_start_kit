<template>
  <transition name="fade">
    <div
      v-if="hasLoadingAPIs"
      class="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center flex-col"
    >
      <h3 class="animate-pulse text-base mb-3">Loading...</h3>
      <button
        class="bg-white hover:bg-gray-100 text-gray-700 py-2 px-4 border border-gray-400 rounded focus:outline-none"
        @click="onClose"
      >
        關 閉
      </button>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { CLEAR_LOADING_API_QUEUE } from "@/constants/mutations";

export default {
  setup() {
    const $store = useStore();
    const onClose = () => {
      $store.commit(CLEAR_LOADING_API_QUEUE);
    };
    const hasLoadingAPIs = computed(
      () => $store.state.system.loadingAPIs.length > 0
    );
    return {
      hasLoadingAPIs,
      onClose,
    };
  },
};
</script>
