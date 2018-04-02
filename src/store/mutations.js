/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-31 19:16:27
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:45:39
 */

import { storage, StorageKey } from "./storage";
import { MutationName } from "./types";

export default {
  [MutationName.SET_USER](state, user) {
    if (!user) throw "Param user is undefined.";
    state.user = user;
    storage.set(StorageKey.USER, user);
  },
  [MutationName.CLEAR_USER](state) {
    state.user = {};
    storage.remove(StorageKey.USER);
  },
  [MutationName.SET_ARTICLE](state, article) {
    if (!article) throw "Param article is undefined.";
    state.article = article;
    storage.set(StorageKey.ARTICLE, article);
  },
  [MutationName.CLEAR_ARTICLE](state) {
    state.article = {};
    storage.remove(StorageKey.ARTICLE);
  },
  [MutationName.SET_VISITOR](state, visitor) {
    if (!visitor) throw "Param visitor is undefined.";
    state.visitor = visitor;
    storage.set(StorageKey.VISITOR, visitor);
  },
  [MutationName.SET_COMMENT_USER](state, comment) {
    if (!comment) throw "Param comment is undefined.";
    state.visitor.comment = comment;
    storage.set(StorageKey.VISITOR, state.visitor);
  },
  [MutationName.CLEAR_COMMENT_USER](state) {
    state.visitor.comment = {};
    storage.set(StorageKey.VISITOR, state.visitor);
  },
  [MutationName.SET_TAGS](state, tags) {
    if (!tags) throw "Param tags is undefined.";
    state.tags = tags;
    storage.set(StorageKey.TAGS, tags);
  }
};
