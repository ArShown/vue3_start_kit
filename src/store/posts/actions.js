import axios from "@/utils/axios-instance";
import { GET_POSTS } from "@/constants/actions";
import { SET_POSTS } from "@/constants/mutations";

const actions = {
  async [GET_POSTS]({ commit }, page) {
    const res = await axios("/posts");
    if (res.code === 0) {
      commit(SET_POSTS, {
        data: res.data,
        currentPage: page,
        totalAmount: res.data.length,
      });
    }
  },
};

export default actions;
