/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:49:00
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 20:15:53
 */

import express from "express";
import api from "../../api/essay";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 查找随记
 */
router.get("/", verifyRouteToken, (req, res) => {
  let { page, limit } = req.query;
  api
    .getEssay(req.query, page, limit)
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
      res.send({
        code: -200,
        message: "获取随记失败"
      });
    });
});

/**
 * 添加随记
 * @param {string} name
 */
router.post("/", verifyRouteToken, (req, res) => {
  api
    .createEssay(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "添加随记成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "添加随记失败"
      });
    });
});

/**
 * 删除随记
 * @param {number} id
 */
router.delete("/", verifyRouteToken, (req, res) => {
  let { id } = req.query;
  api
    .removeEssay(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除随记成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "删除随记失败"
      });
    });
});

export default router;
