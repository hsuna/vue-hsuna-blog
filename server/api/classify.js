import { Classify } from "../models";

/**
 * 查找分类
 * @param {number} page -1表示返回全部
 * @param {number} limit 默认10
 */
const getClassify = (page = -1, limit = 10) => {
  let promiseList;
  if (-1 == page) {
    promiseList = [Classify.find()];
  } else {
    let skip = (page - 1) * limit;
    promiseList = [
      Classify.find()
        .skip(skip)
        .limit(limit),
      Classify.count()
    ];
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
