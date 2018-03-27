/*
 * @Description 文章接口-无权限
 * @Author: Hsuan 
 * @Date: 2018-03-27 09:57:58 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-27 10:54:46
 */

import express from "express";
import api from "../api/article";

const router = express.Router();

/**
 * 查找文章
 */
router.get("/", (req, res) => {
  let { id, title, classify, page, limit } = req.query;
  api
    .getArticles({
      id,
      title,
      classify,
      status: 3//游客模式只能阅读公开的文章
    }, page, limit)
    .then(result => {
      res.send({
        code: 200,
        data: result
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取文章失败"
      });
    });
});

export default router;
