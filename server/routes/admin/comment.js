/*
 * @Description 文章接口-无权限
 * @Author: Hsuan
 * @Date: 2018-03-27 09:57:58
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-04 02:58:51
 */

import express from "express";
import api from "../../api/comment";
import api_article from "../../api/article";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 更新文章评论
 */
router.post("/", verifyRouteToken, (req, res) => {
  let { id } = req.body;
  let commentId;

  req.body.comment.admin = true; //管理员回复
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
        data: result
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
 * 删除文章评论
 */
router.delete("/", verifyRouteToken, (req, res) => {
  let { id, articleId } = req.query;

  api_article
    .updateArticle(articleId, { comments: id }, "$pull") //先删除文章里的关联
    .then(result => {
      return api.removeComment(id);
    })
    .then(result => {
      res.send({
        code: 200,
        message: "删除评论成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "删除评论失败"
      });
    });
});

export default router;
