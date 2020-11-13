import {
  SET_USER_INFO,
  CLEAR_USER_INFO,
  SET_WELCOME_TOAST_DISPLAY,
  ADD_LOADING_API_QUEUE,
  DEL_LOADING_API_QUEUE,
  SET_BREADCRUMB,
  CLEAR_BREADCRUMB,
} from "@/constants/mutations";
import { append, reject, equals } from "ramda";

const mutations = {
  [SET_USER_INFO](state, data) {
    state.userInfo = data;
  },
  [CLEAR_USER_INFO](state) {
    state.userInfo = {};
  },
  [SET_WELCOME_TOAST_DISPLAY](state, flag) {
    state.showWelcomeToast = flag;
  },
  [ADD_LOADING_API_QUEUE](state, apiDesc) {
    state.loadingAPIs = append(apiDesc, state.loadingAPIs);
  },
  [DEL_LOADING_API_QUEUE](state, apiDesc) {
    state.loadingAPIs = reject(equals(apiDesc), state.loadingAPIs);
  },
  [SET_BREADCRUMB](state, list) {
    state.breadcrumb = list;
  },
  [CLEAR_BREADCRUMB](state) {
    state.breadcrumb = [];
  },
};

export default mutations;
