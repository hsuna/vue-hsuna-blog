import { StorageKey, ActionsKey } from "./types";

export default {
  [ActionsKey.USER_LOGIN](state, user) {
    state.setStorage(StorageKey.USER, user);
  },
  [ActionsKey.USER_LOGOUT](state) {
    state.removeStorage(StorageKey.USER);
  },
  [ActionsKey.RECORD_ARTICLE](state, article) {
    state.setStorage(StorageKey.ARTICLE, article);
  },
  [ActionsKey.CLEAR_ARTICLE](state) {
    state.removeStorage(StorageKey.ARTICLE);
  },
  [ActionsKey.RECORD_COMMENT_USER](state, comment) {
    state.setStorage(StorageKey.COMMENT_USER, comment);
  },
  [ActionsKey.CLEAR_COMMENT_USER](state) {
    state.removeStorage(StorageKey.COMMENT_USER);
  },
  [ActionsKey.ADD_BROWES_TIME](state, id) {
    let browesTimes = state.getStorage(StorageKey.BROWES_TIME) || [];
    if(-1 == browesTimeList.indexOf(id)){
      browesTimeList.push(id);
    }
    state.setStorage(StorageKey.BROWES_TIME, browesTimeList);
  }
};
