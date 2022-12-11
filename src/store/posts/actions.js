import http from "@/services/http-service";

const actions = {
  async read({ commit }, page) {
    const res = await http.get("/posts");
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
