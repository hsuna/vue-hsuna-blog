/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-31 19:16:27
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:45:39
 */

import storage, { StorageKey } from "../../../utils/storage";
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
  [MutationName.SET_TAGS](state, tags) {
    if (!tags) throw "Param tags is undefined.";
    state.tags = tags;
    storage.set(StorageKey.TAGS, tags);
  }
};
