import axios from "@/utils/axios-instance";

const actions = {
  async read({ commit }, page) {
    const res = await axios("/posts");
    if (res.code === 0) {
      commit("insert", {
        data: res.data,
        currentPage: page,
        totalAmount: res.data.length,
      });
    }
  },
};

export default actions;
