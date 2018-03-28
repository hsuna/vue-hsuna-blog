import { StorageKey, ActionsKey } from "store/types";

export default {
  //用户登录
  [ActionsKey.USER_LOGIN](state, user) {
    state.setStorage(StorageKey.USER, user);
  },
  //用户登出
  [ActionsKey.USER_LOGOUT](state) {
    state.removeStorage(StorageKey.USER);
  },
  //记录缓存文章
  [ActionsKey.RECORD_ARTICLE](state, article) {
    state.setStorage(StorageKey.ARTICLE, article);
  },
  //清除缓存文章
  [ActionsKey.CLEAR_ARTICLE](state) {
    state.removeStorage(StorageKey.ARTICLE);
  },
  //记录评论用户
  [ActionsKey.RECORD_COMMENT_USER](state, comment) {
    state.setStorage(StorageKey.COMMENT_USER, comment);
  },
  //清除缓存文章
  [ActionsKey.CLEAR_COMMENT_USER](state) {
    state.removeStorage(StorageKey.COMMENT_USER);
  }
};
