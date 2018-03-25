/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-26 01:48:38
 */

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
