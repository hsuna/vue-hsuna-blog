import { Classify } from "../models";

/**
 * 查找分类
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getClassify = (query, page, limit = 10) => {
  //设置为不可枚举
  ['id', 'page', 'limit'].forEach(key => {
    Object.defineProperty(query, key, {enumerable:false});
  });

  let promiseList;
  if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Classify.find(query)
      .skip(skip)
      .limit(limit)
      .sort({_id: -1}),
      Classify.find(query).count()
    ];
  } else {
    promiseList = [Classify.find(query).sort({_id: -1})];
  }
  return Promise.all(promiseList);
};

/**
 * 创建分类
 * @param {object} classify
 */
const createClassify = classify => {
  return Classify.create(classify);
};

/**
 * 更新分类
 * @param {number} id
 * @param {object} classify
 */
const updateClassify = (id, classify) => {
  classify.updateAt = Date.now();
  return Classify.update({ _id: id }, { $set: classify });
};

/**
 * 删除分类
 * @param {number} id
 */
const removeClassify = id => {
  return Classify.remove({ _id: id });
};

export default {
  getClassify,
  createClassify,
  updateClassify,
  removeClassify
};
