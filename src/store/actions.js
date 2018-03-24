export default {
  //用户登录
  userLogin({ commit }, token) {
    commit("userLogin", token);
  }
};
