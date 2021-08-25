import axios from "@/utils/axios-instance";
import $router from "@/router";
import swal from "sweetalert2";

const actions = {
  async login({ commit }) {
    const res = await axios("/login");
    if (res.code === 0) {
      commit("set/info", res.data);
      commit("app/set/welcome/toast", true, { root: true });
      $router.push({ name: "default-path" });
    }
  },
  logout({ commit }) {
    commit("clear/info");
    swal.fire("登出成功");
    $router.push({ name: "/login" });
  },
};

export default actions;
