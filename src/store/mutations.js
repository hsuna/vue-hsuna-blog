export default {
  //用户登录
  userLogin(state, token) {
    localStorage.setItem("token", token);
    state.token = token;
  },
  //用户登出
  userLogout(state, token) {
    localStorage.removeItem("token");
    state.token = null;
  }
};
