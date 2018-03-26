/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-26 22:10:56
 */

export default {
  //用户登录
  userLogin({ commit }, user) {
    commit("userLogin", user);
  },
  //用户退出
  userLogout({ commit }) {
    commit("userLogout");
  },
  //记录缓存文章
  recordArticle({ commit }, article) {
    commit("recordArticle", article);
  },
  //清除缓存文章
  clearArticle({ commit }) {
    commit("clearArticle");
  }
};
