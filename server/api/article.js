import { Article } from "../models";

/**
 * 获取所有文章
 * @param {number} page
 * @param {number} limit
 */
const getAllArticles = (page, limit) => {
  if (page && limit) {
    var skip = (page - 1) * limit;
    return Promise.all([
      Article.find()
        .addCreateAt()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Article.count().exec()
    ]);
  } else {
    return Article.find()
      .addCreateAt()
      .sort({ _id: -1 })
      .exec();
  }
};

/**
 * 通过分类获取文章
 * @param {string} classify
 */
const getArticlesByClassify = classify => {
  return Article.find({ classify })
    .addCreateAt()
    .sort({ _id: -1 })
    .exec();
};

/**
 * 创建文章
 * @param {object} article
 */
const createArticle = article => {
  return Article.create(article).exec();
};

/**
 * 更新文章
 * @param {number} id
 * @param {object} article
 */
const updateArticle = (id, article) => {
  return Article.update({ _id: id }, { $set: article }).exec();
};

/**
 * 删除文章
 * @param {number} id
 */
const removeArticle = id => {
  return Article.remove({ _id: id }).exec();
};

export default {
  getAllArticles,
  getArticlesByClassify,
  createArticle,
  updateArticle,
  removeArticle
};
