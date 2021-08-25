const mutations = {
  "set/info"(state, data) {
    state.userInfo = data;
  },
  "clear/info"(state) {
    state.userInfo = {};
  },
};

export default mutations;
