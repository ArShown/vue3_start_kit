import { createStore } from "vuex";
import system from "./system";
import posts from "./posts";

const store = createStore({
  modules: {
    system,
    posts,
  },
});

export default store;
