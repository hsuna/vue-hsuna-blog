export default {
  //用户登录
  userLogin(state, user) {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  //用户登出
  userLogout(state) {
    localStorage.removeItem("user");
    state.user = {};
  }
};
