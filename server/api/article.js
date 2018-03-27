/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-27 15:59:21
 */

import { Article } from "../models";

/**
 * 查找文章
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getArticles = (query, page, limit = 10) => {
  //设置为不可枚举
  ['id', 'page', 'limit'].forEach(key => {
    Object.defineProperty(query, key, {enumerable:false});
  });
  
  let promiseList;
  let { id } = query;
  if (id) {
    promiseList = [ Article.findById(id) ];
  } else if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Article.find(query)
      .skip(skip)
      .limit(limit)
      .sort({_id: -1}),
      Article.find(query).count()
    ];
  } else {
    promiseList = [
      Article.find(query)
      .sort({_id: -1})
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
  if(1 == article.status){
    article.publishAt = Date.now();
  }
  article.updateAt = Date.now();
  return Article.update({
    _id: id
  }, {
    $set: article
  });
};

/**
 * 删除文章
 * @param {number} id
 */
const removeArticle = id => {
  return Article.remove({
    _id: id
  });
};

export default {
  getArticles,
  createArticle,
  updateArticle,
  removeArticle
};
