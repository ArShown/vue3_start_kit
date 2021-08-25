import { createStore } from "vuex";
import modules from "./_app/store";
const store = createStore({
  modules,
});

export default store;
