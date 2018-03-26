/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-27 01:09:21
 */

import { Article } from "../models";

/**
 * 查找文章
 * @param {object} query
 */
const getArticles = query => {
  let { id, page = -1, limit = 10 } = query;
  let promiseList = [];
  if (id) {
    promiseList = [Article.find({ _id: id })];
  } else if (-1 == page) {
    promiseList = [Article.find(query)];
  } else {
    let skip = (page - 1) * limit;
    promiseList = [
      Article.find()
        .skip(skip)
        .limit(limit),
      Article.find().count()
    ];
  }
  return Promise.all(promiseList);
};

/**
 * 创建文章
 * @param {object} article
 */
const createArticle = article => {
  return Article.create(article);
};

/**
 * 更新文章
 * @param {number} id
 * @param {object} article
 */
const updateArticle = (id, article) => {
  article.updateAt = Date.now();
  return Article.update({ _id: id }, { $set: article });
};

/**
 * 删除文章
 * @param {number} id
 */
const removeArticle = id => {
  return Article.remove({ _id: id });
};

export default {
  getArticles,
  createArticle,
  updateArticle,
  removeArticle
};
