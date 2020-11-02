<template>
  <div class="text-sm text-gray-500">
    <span class="float-left">
      <router-link
        to="/dashboard"
        :class="{
          'text-black': hasChild,
          'cursor-pointer': hasChild,
          'hover:text-blue-400': hasChild,
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
    <transition-group name="breadcrumb" :duration="30000">
      <span
        class="float-left"
        v-for="(route, idx) in breadcrumb"
        :key="route.path"
      >
        <router-link
          :to="route.path"
          :class="{
            'text-black': hasNext(idx),
            'cursor-pointer': hasNext(idx),
            'hover:text-blue-400': hasNext(idx),
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
    <div class="clear-both"></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { map, is } from "ramda";

export default {
  name: "TheBreadcrumb",
  setup() {
    const $store = useStore();
    const breadcrumb = computed(() => {
      return map((bread) => {
        if (is(Function, bread)) bread = bread($store.state);
        return bread;
      })($store.state.system.breadcrumb);
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
