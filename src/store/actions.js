/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-30 15:00:37
 */
import { ActionsKey } from "./types";

export default {
  [ActionsKey.USER_LOGIN]({ commit }, user) {
    commit(ActionsKey.USER_LOGIN, user);
  },
  [ActionsKey.USER_LOGOUT]({ commit }) {
    commit(ActionsKey.USER_LOGOUT);
  },
  [ActionsKey.RECORD_ARTICLE]({ commit }, article) {
    commit(ActionsKey.RECORD_ARTICLE, article);
  },
  [ActionsKey.CLEAR_ARTICLE]({ commit }) {
    commit(ActionsKey.CLEAR_ARTICLE);
  },
  [ActionsKey.RECORD_COMMENT_USER]({ commit }, comment) {
    commit(ActionsKey.RECORD_COMMENT_USER, comment);
  },
  [ActionsKey.CLEAR_COMMENT_USER]({ commit }) {
    commit(ActionsKey.CLEAR_COMMENT_USER);
  },
  [ActionsKey.ADD_BROWES_TIME]({ commit }, id) {
    commit(ActionsKey.ADD_BROWES_TIME, id);
  },
};
