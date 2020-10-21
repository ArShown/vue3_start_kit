import { createStore } from "vuex";
import system from "./system";

const store = createStore({
  modules: {
    system,
  },
});

export default store;
