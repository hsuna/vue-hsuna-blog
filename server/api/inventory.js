/*
 * @Description: 接口-清单
 * @Author: Hsuna
 * @Date: 2018-04-25 18:58:36
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 19:07:34
 */

import { Inventory } from "../models";

/**
 * 查找清单
 * @param {object} query
 * @param {number} page  默认返回全部
 * @param {number} limit 默认10
 */
const getInventory = (query, page, limit = 10) => {
  //设置为不可枚举
  ["id", "page", "limit"].forEach(key => {
    Object.defineProperty(query, key, { enumerable: false });
  });

  let promiseList;
  if (page && limit) {
    let skip = (page - 1) * limit;
    promiseList = [
      Inventory.find(query)
        .skip(skip)
        .limit(limit * 1)
        .sort({ _id: -1 }),
      Inventory.find(query).count()
    ];
  } else {
    promiseList = [Inventory.find(query).sort({ _id: -1 })];
  }
  return Promise.all(promiseList);
};

/**
 * 创建清单
 * @param {object} inventory
 */
const createInventory = inventory => {
  return Inventory.create(inventory);
};

/**
 * 删除清单
 * @param {number} id
 */
const removeInventory = id => {
  return Inventory.remove({ _id: id });
};

export default {
  getInventory,
  createInventory,
  removeInventory
};
