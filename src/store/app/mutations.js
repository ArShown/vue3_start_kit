import { append, reject, equals } from "ramda";

const mutations = {
  "set/welcome/toast"(state, flag) {
    state.showWelcomeToast = flag;
  },
  "add/loadingApiQueue"(state, apiDesc) {
    state.loadingAPIs = append(apiDesc, state.loadingAPIs);
  },
  "remove/loadingApiQueue"(state, apiDesc) {
    state.loadingAPIs = reject(equals(apiDesc), state.loadingAPIs);
  },
  "set/breadcrumb"(state, list) {
    state.breadcrumb = list;
  },
  "clear/breadcrumb"(state) {
    state.breadcrumb = [];
  },
};

export default mutations;
