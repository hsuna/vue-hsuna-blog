/*
 * @Description 文章接口-无权限
 * @Author: Hsuan
 * @Date: 2018-03-27 09:57:58
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-30 01:04:44
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

const guestCommentFilter = comment => ({
  id: comment._id,
  name: comment.name,
  content: comment.content,
  createdAt: comment.createdAt
});

const guestDetailFilter = article =>
  Object.assign(guestBaseFilter(article), {
    comments: article.comments.map(guestCommentFilter), //评论
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
      let [article] = result;
      if (1 == article.status) {
        res.send({
          code: 200,
          data: guestDetailFilter(article)
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
        message: "该文章不存在"
      });
    });
});

/**
 * 查找相关文章
 */
router.get("/relate", (req, res) => {
  let { classify, page = 1, limit = 5 } = req.query;
  api
    .getArticles({ classify, status: 1, sort: { publishAt: -1 } }, page, limit)
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
 * 更新文章评论
 */
router.put("/comment", (req, res) => {
  let { id } = req.body;
  api
    .updateArticle(id, { comments: req.body.comment }, "$push")
    .then(result => {
      return api.getArticles({ id });
    })
    .then(result => {
      let [article] = result;
      res.send({
        code: 200,
        message: "提交评论成功",
        data: article.comments.map(guestCommentFilter)
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "提交评论失败"
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
