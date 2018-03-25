import { Classify } from "../models";

/**
 * 查看所有分类
 */
const getAllClassify = () => {
  return Classify.find();
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
  getAllClassify,
  createClassify,
  updateClassify,
  removeClassify
};
