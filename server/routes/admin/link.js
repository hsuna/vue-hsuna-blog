/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:49:00
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 20:15:42
 */

import express from "express";
import api from "../../api/link";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 查找链接
 */
router.get("/", verifyRouteToken, (req, res) => {
  let { page, limit } = req.query;
  api
    .getLink(req.query, page, limit)
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
        message: "获取链接失败"
      });
    });
});

/**
 * 添加链接
 * @param {string} name
 */
router.post("/", verifyRouteToken, (req, res) => {
  let { name } = req.body;
  if (!name || "" == name) {
    return res.send({
      code: -200,
      message: "链接名称为空"
    });
  }
  api
    .createLink(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "添加链接成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "添加链接失败"
      });
    });
});

/**
 * 删除链接
 * @param {number} id
 */
router.delete("/", verifyRouteToken, (req, res) => {
  let { id } = req.query;
  api
    .removeLink(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除链接成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "删除链接失败"
      });
    });
});

export default router;
