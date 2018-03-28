/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 01:57:40
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
  ["id", "page", "limit", "sort"].forEach(key => {
    Object.defineProperty(query, key, { enumerable: false });
  });

  let promiseList;
  let { id, sort = { _id: -1 } } = query;
  if (id) {
    promiseList = [Article.findById(id)];
  } else if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Article.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Article.find(query).count()
    ];
  } else {
    promiseList = [Article.find(query).sort(sort)];
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
const updateArticle = (id, article, update = "$set") => {
  if ("$set" == update) {
    article.updateAt = Date.now();
  }
  if (1 == article.status) {
    return new Promise((resolve, reject) => {
      Article.findById(id)
        .then(result => {
          //对于未发布的文章，发布了需要添加发布时间
          if (result.status != article.status) {
            article.publishAt = Date.now();
          }
          return Article.findByIdAndUpdate(id, { [update]: article });
        })
        .then(resolve)
        .catch(reject);
    });
  } else {
    return Article.findByIdAndUpdate(id, { [update]: article });
  }
};

/**
 * 删除文章
 * @param {number} id
 */
const removeArticle = id => {
  return Article.remove({ _id: id });
};

/**
 * 统计分类数量
 * @param {number} id
 */
const getCountByClassify = match => {
  return Article.aggregate([
    { $match: match },
    { $group: { _id: "$classify", count: { $sum: 1 } } }
  ]);
};

export default {
  getArticles,
  createArticle,
  updateArticle,
  removeArticle,

  getCountByClassify
};
