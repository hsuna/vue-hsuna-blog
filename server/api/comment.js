/*
 * @Description: 文章评论-数据接口
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-13 18:14:13
 */

import { Comment } from "../models";

/**
 * 查找文章评论
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
      .limit(limit * 1);
  } else {
    return Comment.find(query).sort(sort);
  }
};

/**
 * 创建文章评论
 * @param {object} comment
 */
const createComment = comment => {
  return Comment.create(comment);
};

/**
 * 删除文章评论
 * @param {number} id
 */
const removeComment = id => {
  return Comment.remove({ _id: id });
};

export default {
  getComment,
  createComment,
  removeComment
};
