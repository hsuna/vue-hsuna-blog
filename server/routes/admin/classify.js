/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:49:00
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 00:24:40
 */

import express from "express";
import api from "../../api/classify";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 查找分类
 */
router.get("/", verifyRouteToken, (req, res) => {
  let { page, limit } = req.query;
  api
    .getClassify(req.query, page, limit)
    .then(result => {
      let [ list, total ] = result;
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
        message: "获取分类失败"
      });
    });
});

/**
 * 添加分类
 * @param {string} title
 */
router.post("/", verifyRouteToken, (req, res) => {
  let { title } = req.body;
  if (!title || "" == title) {
    res.send({
      code: -200,
      message: "分类名称为空"
    });
    return;
  }
  api
    .createClassify(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "添加分类成功"
      });
    })
    .catch(err => {
      let message = "添加分类失败";
      if (11000 == err.code) {
        message = "分类名称已存在";
      }
      res.send({
        code: -200,
        message
      });
    });
});

/**
 * 更新分类
 * @param {number} id
 * @param {string} title
 */
router.put("/", verifyRouteToken, (req, res) => {
  let { id, title } = req.body;
  if (!title || "" == title) {
    res.send({
      code: -200,
      message: "分类名称为空"
    });
    return;
  }
  api
    .updateClassify(id, req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "更新分类成功"
      });
    })
    .catch(err => {
      let message = "更新分类失败";
      if (11000 == err.code) {
        message = "分类名称已存在";
      }
      res.send({
        code: -200,
        message
      });
    });
});

/**
 * 删除分类
 * @param {number} id
 */
router.delete("/", verifyRouteToken, (req, res) => {
  let { id } = req.query;
  api
    .removeClassify(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除分类成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "删除分类失败"
      });
    });
});

export default router;
