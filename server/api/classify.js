import Classify from "../modules/Classify";

/**
 * 查看所有分类
 */
const getAllClassify = () => {
  return Classify.find()
    .addCreateAt()
    .sort({ _id: -1 })
    .exec();
};

/**
 * 创建分类
 * @param {object} classify
 */
const createClassify = classify => {
  return Classify.create(classify).exec();
};

/**
 * 更新分类
 * @param {number} id
 * @param {object} classify
 */
const updateClassify = (id, classify) => {
  return Classify.update({ _id: id }, { $set: classify }).exec();
};

/**
 * 删除分类
 * @param {number} id
 */
const removeClassify = id => {
  return Classify.remove({ _id: id }).exec();
};

export default {
  getAllClassify,
  createClassify,
  updateClassify,
  removeClassify
};
