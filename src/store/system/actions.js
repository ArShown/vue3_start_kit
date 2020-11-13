import axios from "@/utils/axios-instance";
import $router from "@/router";
import swal from "sweetalert2";
import { LOGIN, LOGOUT } from "@/constants/actions";
import {
  SET_USER_INFO,
  SET_WELCOME_TOAST_DISPLAY,
  CLEAR_USER_INFO,
} from "@/constants/mutations";

const actions = {
  async [LOGIN]({ commit }) {
    const res = await axios("/login");
    if (res.code === 0) {
      commit(SET_USER_INFO, res.data);
      commit(SET_WELCOME_TOAST_DISPLAY, true);
      $router.push({ name: "default-path" });
    }
  },
  [LOGOUT]({ commit }) {
    commit(CLEAR_USER_INFO);
    swal.fire("登出成功");
    $router.push({ name: "/login" });
  },
};

export default actions;
