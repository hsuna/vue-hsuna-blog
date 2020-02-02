/*
 * @Description: 状态
 * @Author: Hsuna
 * @Date: 2018-03-25 00:42:43
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 19:23:10
 */
import storage, { StorageKey } from "src/utils/storage";

const defaultValue = {
  tags: '["HTML", "CSS", "JavaScript"]'
};

export default {
  user: storage.get(StorageKey.USER),
  tags: storage.get(StorageKey.TAGS, defaultValue.tags),
  article: storage.get(StorageKey.ARTICLE),
};
