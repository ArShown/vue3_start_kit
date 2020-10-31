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
import { reactive, computed } from "vue";
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
  let flag = false;
  for (let idx in child) {
    const item = child[idx];
    if (item.path === currentPath) {
      flag = true;
      break;
    } else if ("child" in item)
      flag = hasChildCurrentRoute(currentPath)(item.child);
  }
  return flag;
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
    const bindTransferLogic = transferLogic(currentPath.value);

    const model = reactive({
      menu: bindTransferLogic(props.menu),
    });
    const onOpen = (id) => {
      model.menu = computeLogic(id)(model.menu);
    };

    return {
      currentPath,
      model,
      onOpen,
      transferLogic: bindTransferLogic,
      computeLogic,
    };
  },
};
</script>

<style scoped></style>
