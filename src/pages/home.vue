<template>
  <div>Home</div>
  <HelloWorld msg="hi" />
  <button @click="logoutHandler">logout</button>
</template>

<script>
import { useStore } from "vuex";
import { LOGOUT } from "@/constants/actions";

export default {
  name: "Home",
  setup() {
    const $store = useStore();
    const logoutHandler = () => {
      $store.dispatch(LOGOUT);
    };
    return {
      logoutHandler,
    };
  },
};
</script>
