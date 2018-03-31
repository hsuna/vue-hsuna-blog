/*
 * @Description: 状态
 * @Author: Hsuna
 * @Date: 2018-03-25 00:42:43
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-31 19:16:00
 */
import { storage, StorageKey } from "./storage";
import store from ".";

export default {
  user: storage.get(StorageKey.USER),
  article: storage.get(StorageKey.ARTICLE),
  visitor: storage.get(StorageKey.VISITOR)
};
