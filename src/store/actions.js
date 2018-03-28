/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 02:59:31
 */
import { ActionsKey } from "store/types";

export default {
  //用户登录
  [ActionsKey.USER_LOGIN]({ commit }, user) {
    commit(ActionsKey.USER_LOGIN, user);
  },
  //用户退出
  [ActionsKey.USER_LOGOUT]({ commit }) {
    commit(ActionsKey.USER_LOGOUT);
  },
  //记录缓存文章
  [ActionsKey.RECORD_ARTICLE]({ commit }, article) {
    commit(ActionsKey.RECORD_ARTICLE, article);
  },
  //清除缓存文章
  [ActionsKey.CLEAR_ARTICLE]({ commit }) {
    commit(ActionsKey.CLEAR_ARTICLE);
  },
  //记录评论用户
  [ActionsKey.RECORD_COMMENT_USER]({ commit }, comment) {
    commit(ActionsKey.RECORD_COMMENT_USER, comment);
  },
  //清除缓存文章
  [ActionsKey.CLEAR_COMMENT_USER]({ commit }) {
    commit(ActionsKey.CLEAR_COMMENT_USER);
  }
};
