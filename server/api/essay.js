/*
 * @Description: 接口-随记
 * @Author: Hsuna
 * @Date: 2018-04-25 18:58:36
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:40
 */

import { Essay } from "../models";

/**
 * 查找随记
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getEssay = (query, page, limit = 10) => {
  //设置为不可枚举
  ["id", "page", "limit"].forEach(key => {
    Object.defineProperty(query, key, { enumerable: false });
  });

  let promiseList;
  if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Essay.find(query)
        .skip(skip)
        .limit(limit * 1)
        .sort({ _id: -1 }),
      Essay.find(query).count()
    ];
  } else {
    promiseList = [Essay.find(query).sort({ _id: -1 })];
  }
  return Promise.all(promiseList);
};

/**
 * 创建随记
 * @param {object} essay
 */
const createEssay = essay => {
  return Essay.create(essay);
};

/**
 * 删除随记
 * @param {number} id
 */
const removeEssay = id => {
  return Essay.remove({ _id: id });
};

export default {
  getEssay,
  createEssay,
  removeEssay
};
