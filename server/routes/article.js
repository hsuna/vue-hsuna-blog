import express from "express";
import api from "../api/article";

const router = express.Router();

/**
 * 获取所有文章
 */
router.get("/all", (req, res) => {
  let { page, limit } = req.query;
  api
    .getAllArticles(page, limit)
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

/**
 * 通过分类查找文章
 */
router.get("/classify", (req, res) => {
  let { classify } = req.body;
  api
    .getArticlesByClassify(classify)
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
