/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 13:46:00
 */

import { Comment } from "../models";

/**
 * 查找文章
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getComment = (query, page, limit = 10) => {
  //设置为不可枚举
  ["id", "page", "limit", "sort"].forEach(key => {
    Object.defineProperty(query, key, { enumerable: false });
  });
  let { id, sort = { _id: -1 } } = query;
  if (id) {
    return Comment.findById(id);
  } else if (page && limit) {
    let skip = (page - 1) * limit;
    return Comment.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } else {
    return Comment.find(query).sort(sort);
  }
};

/**
 * 创建文章
 * @param {object} comment
 */
const createComment = comment => {
  return Comment.create(comment);
};

export default {
  getComment,
  createComment
};
