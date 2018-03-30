/*
 * @Description: 状态
 * @Author: Hsuna
 * @Date: 2018-03-25 00:42:43
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-30 17:10:20
 */
import {　StorageKey　} from "./types";
import store from ".";

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
  arr.forEach(([store, storage]) => {
    tmp[store] = getStorage(storage);
  });
  return tmp;
};

export default {
  ...parseStorage([
    ['user', StorageKey.USER],
    ['article', StorageKey.ARTICLE],
    ['browesTime', StorageKey.BROWES_TIME],
    ['commentUser', StorageKey.COMMENT_USER]
  ]),

  getStorage,
  setStorage,
  removeStorage
};
