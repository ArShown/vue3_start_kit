<template>
  <div class="text-sm text-gray-300">
    <span>
      <span class="float-left">
        <router-link
          to="/dashboard"
          :class="{
            'text-white': hasChild,
            'hover:text-blue-800': hasChild,
          }"
        >
          Dashboard
        </router-link>
        <span
          class="mx-2"
          :class="{
            visible: hasChild,
            invisible: !hasChild,
          }"
          >/</span
        >
      </span>
      <transition-group name="breadcrumb">
        <span
          class="inline-block"
          v-for="(route, idx) in breadcrumb"
          :key="route.path"
        >
          <router-link
            :to="route.path"
            :class="{
              'text-white': hasNext(idx),
              'cursor-default': !hasNext(idx),
              'hover:text-blue-800': hasNext(idx),
            }"
            >{{ route.title }}
          </router-link>
          <span
            class="mx-2"
            :class="{
              visible: hasNext(idx),
              invisible: !hasNext(idx),
            }"
            >/</span
          >
        </span>
      </transition-group>
    </span>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBreadcrumbStore } from "@/store/app/breadcrumb-store";
import { map, is } from "ramda";

export default {
  name: "TheBreadcrumb",
  setup() {
    const route = useRoute();
    const breadcrumbStore = useBreadcrumbStore();
    const breadcrumb = computed(() => {
      return map((bread) => {
        if (is(Function, bread))
          bread = bread(breadcrumbStore.breadcrumbs, route);
        return bread;
      })(breadcrumbStore.breadcrumbs);
    });
    const hasChild = computed(() => breadcrumb.value.length > 0);
    const hasNext = computed(() => (idx) => idx < breadcrumb.value.length - 1);

    return {
      hasChild,
      hasNext,
      breadcrumb,
    };
  },
};
</script>
