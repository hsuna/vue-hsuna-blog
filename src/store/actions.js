export default {
  //用户登录
  userLogin({ commit }, user) {
    commit("userLogin", user);
  },
  //用户退出
  userLogout({ commit }) {
    commit("userLogout");
  }
};
