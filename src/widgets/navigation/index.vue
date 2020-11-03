<template>
  <ul
    class="border-none h-full w-full border-r border-gray-600 list-none relative m-0 pl-0"
  >
    <NavigationItem
      v-for="item in model.menu"
      :key="item.id"
      :model="item"
      :onOpen="onOpen"
      :transferLogic="transferLogic"
      :computeLogic="computeLogic"
      :currentPath="currentPath"
    />
  </ul>
</template>
<script>
import { reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { map } from "ramda";
import NavigationItem from "./item";

const computeLogic = (target) =>
  map((item) => {
    if (item.id === target) item.isOpen = !item.isOpen;
    else item.isOpen = false;
    if ("child" in item)
      item.child = map((child) => {
        child.isOpen = false;
        return child;
      }, item.child);
    return item;
  });

const hasChildCurrentRoute = (currentPath) => (child) => {
  for (let idx in child) {
    const item = child[idx];
    if (
      item.path === currentPath ||
      ("child" in item && hasChildCurrentRoute(currentPath)(item.child))
    )
      return true;
  }
  return false;
};

const transferLogic = (currentPath) => {
  const validListOpen = hasChildCurrentRoute(currentPath);
  return (menu) =>
    map((item) => {
      if ("child" in item) item.isOpen = validListOpen(item.child);
      else item.isOpen = false;
      return item;
    })(menu);
};

export default {
  name: "Navigation",
  props: ["menu"],
  components: {
    NavigationItem,
  },
  setup(props) {
    const $route = useRoute();
    const currentPath = computed(() => $route.path);

    const model = reactive({
      menu: transferLogic(currentPath.value)(props.menu),
    });
    const onOpen = (id) => {
      model.menu = computeLogic(id)(model.menu);
    };

    watch(currentPath, (path) => {
      model.menu = transferLogic(path)(model.menu);
    });

    return {
      currentPath,
      model,
      onOpen,
      transferLogic,
      computeLogic,
    };
  },
};
</script>

<style scoped></style>
