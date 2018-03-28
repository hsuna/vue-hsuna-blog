/*
 * @Description: 状态
 * @Author: Hsuna
 * @Date: 2018-03-25 00:42:43
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 02:57:03
 */
import { StorageKey } from "store/types";

const getStorage = key => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  this[key] = value;
};

const removeStorage = key => {
  localStorage.removeItem(key);
  this[key] = {};
};

const parseStorage = arr => {
  let tmp = {};
  arr.forEach(key => {
    tmp[key] = getStorage(key);
  });
  return tmp;
};

export default {
  ...parseStorage([
    StorageKey.USER,
    StorageKey.ARTICLE,
    StorageKey.COMMENT_USER
  ]),

  getStorage,
  setStorage,
  removeStorage
};
