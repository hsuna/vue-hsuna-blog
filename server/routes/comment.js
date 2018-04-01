/*
 * @Description 文章接口-无权限
 * @Author: Hsuan
 * @Date: 2018-03-27 09:57:58
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 16:55:36
 */

import express from "express";
import mongoose from "mongoose";
import api from "../api/comment";
import api_article from "../api/article";
import { guestCommentFilter } from "../utils/filters";

const router = express.Router();

/**
 * 更新文章评论
 */
router.post("/", (req, res) => {
  let { id } = req.body;
  let commentId;
  api
    .createComment(req.body.comment)
    .then(result => {
      commentId = result._id;
      return api_article.updateArticle(id, { comments: commentId }, "$push");
    })
    .then(result => {
      return api.getComment({ id: commentId.toString() });
    })
    .then(result => {
      res.send({
        code: 200,
        message: "提交评论成功",
        data: guestCommentFilter(result)
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
 * 查找最新留言
 */
router.get("/new", (req, res) => {
  let { limit = 10 } = req.query;
  Object.assign(req.query, {
    sort: { createdAt: -1 } //根据创建时间降序
  });

  api
    .getComment(req.query, 1, limit)
    .then(result => {
      res.send({
        code: 200,
        data: result.map(guestCommentFilter)
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取最新留言失败"
      });
    });
});

export default router;
