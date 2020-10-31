const getters = {
  isLogin: (state) => "id" in state.userInfo,
};

export default getters;
