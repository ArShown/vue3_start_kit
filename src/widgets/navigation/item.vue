<template>
  <div>
    <a
      class="w-full overflow-hidden bg-transparent no-underline cursor-pointer"
      @click="linkHandler"
    >
      <li
        class="text-sm cursor-pointer box-border text-gray-300"
        :class="{
          'text-blue-400': isActive,
        }"
      >
        <div
          class="relative font-light flex items-center h-16 leading-4 bg-gray-800 transition duration-300"
          :class="{
            'pl-4': level === 1,
            'pl-10': level === 2,
            'pl-16': level === 3,
            'pl-24': level === 4,
            'bg-gray-900': !isRoot,
            'hover:bg-opacity-75': !isRoot,
            'hover:bg-black': !isRoot,
            'hover:bg-opacity-50': isRoot,
            'hover:bg-gray-900': isRoot,
          }"
        >
          <component class="w-4 h-4 mr-4" v-if="icon" :is="icon" />
          <span class="font-light">{{ model.title }}</span>
          <i
            class="absolute right-0 test-xs w-4 h-4 transform transition-transform duration-200 origin-center"
            style="right: 1rem; top: 40%"
            v-if="'child' in model"
            :class="{
              'rotate-90': isOpen,
            }"
          >
            <icons.chevron-right />
          </i>
        </div>
        <ul
          v-if="child.isExist"
          class="relative border-none list-none border-r m-0 pl-0 bg-gray-900 overflow-hidden transition-all duration-200"
          :style="`max-height: ${childHeight}rem`"
        >
          <NavigationItem
            v-for="childItem in child.menu"
            :key="childItem.id"
            :model="childItem"
            :level="level + 1"
            :currentPath="currentPath"
            :onOpen="onOpen"
          />
        </ul>
      </li>
    </a>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";

export default {
  name: "NavigationItem",
  props: {
    level: {
      type: Number,
      default: 1,
    },
    model: Object,
    currentPath: String,
    onOpen: Function,
  },
  setup(props) {
    const $router = useRouter();
    const isOpen = computed(() => props.model.isOpen);
    const childHeight = computed(() => props.model.childCount * 4);
    const isActive = computed(() => props.model.path === props.currentPath);
    const child = reactive({
      isExist: computed(() => "child" in props.model),
      menu: computed(() => ("child" in props.model ? props.model.child : [])),
    });

    const icon = computed(() =>
      "icon" in props.model ? `icons.${props.model.icon}` : null
    );

    const linkHandler = (e) => {
      e.stopPropagation();
      const hasPath = "path" in props.model;
      if (child.isExist || !hasPath) e.preventDefault();
      props.onOpen(props.model.id);
      !child.isExist && hasPath && $router.push(props.model.path);
      "event" in props.model && props.model.event.call(this);
    };

    const isRoot = computed(() => props.level === 1);

    return {
      child,
      isRoot,
      linkHandler,
      isOpen,
      childHeight,
      isActive,
      icon,
    };
  },
};
</script>

<style scoped></style>
