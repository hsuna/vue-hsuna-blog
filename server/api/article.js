/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-26 18:35:28
 */

import { Article } from "../models";

/**
 * 获取所有文章
 * @param {number} page
 * @param {number} limit 默认10
 */
const getAllArticles = (page, limit = 10) => {
  if (page && limit) {
    let skip = (page - 1) * limit;
    return Promise.all([
      Article.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit),
      Article.count()
    ]);
  } else {
    return Article.find().sort({ _id: -1 });
  }
};

/**
 * 查找获取文章
 * @param {object} data
 */
const getArticles = data => {
  return Article.find(data.id?{ _id: data.id }:data);
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
  getAllArticles,
  getArticles,
  createArticle,
  updateArticle,
  removeArticle
};
