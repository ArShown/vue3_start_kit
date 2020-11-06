<template>
  <ul
    class="border-none w-full border-r border-gray-600 list-none relative m-0 pl-0"
  >
    <NavigationItem
      v-for="item in model.menu"
      :key="item.id"
      :model="item"
      :onOpen="onOpen"
      :currentPath="currentPath"
    />
  </ul>
</template>
<script>
import { reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { map } from "ramda";
import NavigationItem from "./item";

const hasChildOpenTarget = (target) => (child) => {
  for (let idx in child) {
    const item = child[idx];
    if (
      item.id === target ||
      ("child" in item && hasChildOpenTarget(target)(item.child))
    )
      return true;
  }
  return false;
};

const getChildrenCountById = (id) => (child, count = 0) => {
  for (let idx in child) {
    const item = child[idx];
    if (item.id === id) {
      count += child.length;
      break;
    }
    if ("child" in item)
      if (hasChildOpenTarget(id)(item.child)) {
        count += getChildrenCountById(id)(item.child, child.length);
        break;
      }
  }
  return count;
};

const computeLogic = (target) => {
  const assocInit = map((item) => {
    item.isOpen = false;
    item.childCount = 0;
    if ("child" in item) item.child = assocInit(item.child);
    return item;
  });

  const assocAttrs = map((item) => {
    const hasChild = "child" in item;

    if (item.id === target) {
      item.isOpen = !item.isOpen;
      if (item.isOpen) {
        item.childCount = hasChild ? item.child.length : 0;
        if (hasChild) item.child = assocAttrs(item.child);
      } else {
        item.childCount = 0;
        if (hasChild) item.child = assocInit(item.child);
      }
      return item;
    }

    if (hasChild && hasChildOpenTarget(target)(item.child)) {
      item.isOpen = true;
      item.childCount += getChildrenCountById(target)(item.child);
      item.child = assocAttrs(item.child);
      return item;
    }

    item.isOpen = false;
    item.childCount = 0;
    if (hasChild) item.child = assocInit(item.child);

    return item;
  });

  return assocAttrs;
};

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

const getChildrenCount = (currentPath) => (child, count = 0) => {
  for (let idx in child) {
    const item = child[idx];
    if (item.path === currentPath) {
      count += child.length;
      break;
    }
    if ("child" in item)
      if (hasChildCurrentRoute(currentPath)(item.child)) {
        count += getChildrenCount(currentPath)(item.child, child.length);
        break;
      }
  }
  return count;
};

const transferLogic = (currentPath) => {
  const validListOpen = hasChildCurrentRoute(currentPath);
  const childCount = getChildrenCount(currentPath);

  const assocAttrs = map((item) => {
    item.isOpen = false;
    item.childCount = 0;
    if ("child" in item) {
      item.isOpen = validListOpen(item.child);
      item.childCount = childCount(item.child);
      item.child = assocAttrs(item.child);
    }
    return item;
  });

  return assocAttrs;
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
    };
  },
};
</script>

<style scoped></style>
