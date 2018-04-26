/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:49:00
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 19:49:18
 */

import express from "express";
import api from "../../api/inventory";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 查找清单
 */
router.get("/", verifyRouteToken, (req, res) => {
  let { page, limit } = req.query;
  api
    .getInventory(req.query, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          list: Array.isArray(list) ? list : [list],
          total: total || list.length || 0
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "获取清单失败"
      });
    });
});

/**
 * 添加清单
 * @param {string} title
 */
router.post("/", verifyRouteToken, (req, res) => {
  let { title } = req.body;
  if (!title || "" == title) {
    return res.send({
      code: -200,
      message: "清单名称为空"
    });
  }
  api
    .createInventory(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "添加清单成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "添加清单失败"
      });
    });
});

/**
 * 删除清单
 * @param {number} id
 */
router.delete("/", verifyRouteToken, (req, res) => {
  let { id } = req.query;
  api
    .removeInventory(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除清单成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "删除清单失败"
      });
    });
});

export default router;
