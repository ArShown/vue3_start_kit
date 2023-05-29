<template>
  <div class="relative w-full h-full">
    <div
      class="fixed inset-0 right-auto h-full w-56 bg-gray-800 overflow-hidden transform transition-transform duration-200 z-50"
      :class="{
        '-translate-x-full': !isOpen,
      }"
    >
      <the-side-bar />
    </div>
    <div
      v-if="isMobile"
      v-show="isOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-25"
      @click.prevent="triggerOpen"
    ></div>
    <div
      class="relative h-full transform transition-all duration-200 flex flex-col"
      :class="{
        'ml-56': !isMobile && isOpen,
      }"
    >
      <div
        class="flex-shrink-0 flex-grow-0 h-12 shadow-sm border-b border-gray-500 border-opacity-25 flex items-center bg-blue-500"
      >
        <div
          class="flex-shrink-0 flex-grow-0 w-12 h-full flex items-center justify-center cursor-pointer"
          @click.prevent="triggerOpen"
        >
          <i class="h-4 w-4 text-white">
            <component :is="icon" />
          </i>
        </div>
        <!-- breadcrumb -->
        <the-breadcrumb />
      </div>
      <section class="relative p-4 bg-white h-full overflow-auto">
        <slot />
      </section>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAlertService } from "@/services/alert-service";
import { useAuthStore } from "@/store/auth/store";
import { useWelcomStore } from "@/store/app/welcome-store";

export default {
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const welcomeStore = useWelcomStore();
    const alertService = useAlertService();
    const isMobile = ref(false);
    const isOpen = ref(true);
    const triggerOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const icon = computed(() =>
      isOpen.value ? "icons.indent-decrease" : "icons.indent-increase"
    );
    const userName = computed(() => authStore.userInfo.name);

    const resizeHandler = () => {
      if (window.innerWidth <= 640) {
        isMobile.value = true;
        isOpen.value = false;
      } else {
        isMobile.value = false;
        isOpen.value = true;
      }
    };
    watch(
      () => route.path,
      () => {
        if (isMobile.value && isOpen.value) isOpen.value = false;
      },
      { immediate: true }
    );

    onMounted(() => {
      if (!welcomeStore.isMessageShown) {
        alertService.toast(`${userName.value}，您好！`);
        welcomeStore.setMessageShown();
      }

      resizeHandler();
      window.addEventListener("resize", resizeHandler);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return {
      isMobile,
      isOpen,
      triggerOpen,
      icon,
    };
  },
};
</script>
