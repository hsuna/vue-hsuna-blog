/*
 * @Description 文章接口-无权限
 * @Author: Hsuan
 * @Date: 2018-03-27 09:57:58
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-28 00:03:19
 */

import express from "express";
import api from "../api/article";

const router = express.Router();

const guestBaseFilter = article => ({
  id: article._id,
  title: article.title,
  classify: article.classify,
  about: article.about,
  tags: article.tags,
  publishAt: article.publishAt
});

const guestDetailFilter = article =>
  Object.assign(guestBaseFilter(article), {
    content: article.content //详情
  });

/**
 * 查找文章
 */
router.get("/", (req, res) => {
  let { page, limit } = req.query;
  Object.assign(req.query, { status: 1, sort: { publishAt: -1 } }); //游客模式只能阅读公开的文章
  api
    .getArticles(req.query, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          //id查询直接返回数据
          list: (Array.isArray(list) ? list : [list]).map(guestBaseFilter),
          total: total || list.length || 0
        }
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取文章失败"
      });
    });
});

/**
 * 查找文章详情
 */
router.get("/detail", (req, res) => {
  let { id } = req.query;
  api
    .getArticles({ id })
    .then(result => {
      let [data] = result[0];
      if (3 == data.status) {
        res.send({
          code: 200,
          data: guestDetailFilter(result[0])
        });
      } else {
        res.send({
          code: -200,
          message: "查找文章失败"
        });
      }
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "查找文章失败"
      });
    });
});

/**
 * 获取所有类型的数量
 * @param {object} match
 */
router.get("/classifyCount", (req, res) => {
  Object.assign(req.query, { status: 1 }); //游客模式只能阅读公开的文章
  api
    .getCountByClassify(req.query)
    .then(result => {
      res.send({
        code: 200,
        data: result
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "统计数量失败"
      });
    });
});

export default router;
