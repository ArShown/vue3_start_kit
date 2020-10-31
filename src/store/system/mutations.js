import {
  SET_USER_INFO,
  CLEAR_USER_INFO,
  ADD_LOADING_API_QUEUE,
  DEL_LOADING_API_QUEUE,
  CLEAR_LOADING_API_QUEUE,
} from "@/constants/mutations";
import { append, reject, equals } from "ramda";

const mutations = {
  [SET_USER_INFO](state, data) {
    state.userInfo = data;
  },
  [CLEAR_USER_INFO](state) {
    state.userInfo = {};
  },
  [ADD_LOADING_API_QUEUE](state, apiDesc) {
    state.loadingAPIs = append(apiDesc, state.loadingAPIs);
  },
  [DEL_LOADING_API_QUEUE](state, apiDesc) {
    state.loadingAPIs = reject(equals(apiDesc), state.loadingAPIs);
  },
  [CLEAR_LOADING_API_QUEUE](state) {
    state.loadingAPIs = [];
  },
};

export default mutations;
