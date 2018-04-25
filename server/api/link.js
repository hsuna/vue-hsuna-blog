/*
 * @Description: 接口-链接
 * @Author: Hsuna
 * @Date: 2018-04-25 18:58:36
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 19:08:48
 */

import { Link } from "../models";

/**
 * 查找链接
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getLink = (query, page, limit = 10) => {
  //设置为不可枚举
  ["id", "page", "limit"].forEach(key => {
    Object.defineProperty(query, key, { enumerable: false });
  });

  let promiseList;
  if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Link.find(query)
        .skip(skip)
        .limit(limit * 1)
        .sort({ _id: -1 }),
      Link.find(query).count()
    ];
  } else {
    promiseList = [Link.find(query).sort({ _id: -1 })];
  }
  return Promise.all(promiseList);
};

/**
 * 创建链接
 * @param {object} link
 */
const createLink = link => {
  return Link.create(link);
};

/**
 * 删除链接
 * @param {number} id
 */
const removeLink = id => {
  return Link.remove({ _id: id });
};

export default {
  getLink,
  createLink,
  removeLink
};
