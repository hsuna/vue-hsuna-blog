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
  },
  //记录缓存文章
  recordArticle(state, article) {
    localStorage.setItem("article", JSON.stringify(article));
    state.article = article;
  },
  //清除缓存文章
  clearArticle(state) {
    localStorage.removeItem("article");
    state.article = {};
  }
};
