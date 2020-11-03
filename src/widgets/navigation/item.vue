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
          :class="[paddingRange, bgEffects]"
        >
          <i class="w-4 h-4 mr-4" v-if="Icon">
            <Icon />
          </i>
          <span class="font-light">{{ model.title }}</span>
          <i
            class="absolute right-0 test-xs w-4 h-4 transform transition-transform duration-200 origin-center"
            style="right: 1rem; top: 40%"
            v-if="'child' in model"
            :class="{
              'rotate-90': isOpen,
            }"
          >
            <ChevronRight />
          </i>
        </div>
        <ul
          v-if="child.isExist"
          v-show="isOpen"
          class="relative border-none list-none border-r m-0 pl-0 bg-gray-900 overflow-hidden transition-all duration-200"
        >
          <NavigationItem
            v-for="childItem in child.menu"
            :key="childItem.id"
            :model="childItem"
            :level="level + 1"
            :currentPath="currentPath"
            :onOpen="onChildOpen"
            :transferLogic="transferLogic"
            :computeLogic="computeLogic"
          />
        </ul>
      </li>
    </a>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, computed, watch } from "vue";
import ChevronRight from "@/widgets/icons/chevron-right";

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
    transferLogic: Function,
    computeLogic: Function,
  },
  components: { ChevronRight },
  setup(props) {
    const $router = useRouter();
    const isOpen = computed(() => props.model.isOpen);
    const isActive = computed(() => props.model.path === props.currentPath);
    const child = reactive({
      isExist: "child" in props.model,
      menu:
        "child" in props.model
          ? props.transferLogic(props.currentPath)(props.model.child)
          : [],
    });
    const Icon = computed(() =>
      "icon" in props.model
        ? require(`@/widgets/icons/${props.model.icon}`).default
        : null
    );
    const linkHandler = (e) => {
      e.stopPropagation();
      const hasPath = "path" in props.model;
      if (child.isExist || !hasPath) e.preventDefault();
      props.onOpen(props.model.id);
      !child.isExist && hasPath && $router.push(props.model.path);
      "event" in props.model && props.model.event.call(this);
    };
    const onChildOpen = (id) => {
      child.menu = props.computeLogic(id)(child.menu);
    };
    const isRoot = props.level === 1;

    watch(
      () => props.currentPath,
      (path) => {
        child.menu =
          "child" in props.model ? props.transferLogic(path)(child.menu) : [];
      }
    );

    return {
      child,
      Icon,
      paddingRange: {
        "pl-4": props.level === 1,
        "pl-10": props.level === 2,
        "pl-16": props.level === 3,
        "pl-24": props.level === 4,
      },
      bgEffects: {
        "bg-gray-900": !isRoot,
        "hover:bg-opacity-75": !isRoot,
        "hover:bg-black": !isRoot,
        "hover:bg-opacity-50": isRoot,
        "hover:bg-gray-900": isRoot,
      },
      linkHandler,
      isOpen,
      isActive,
      onChildOpen,
    };
  },
};
</script>

<style scoped></style>
