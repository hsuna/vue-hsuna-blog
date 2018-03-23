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

/**
 * 创建文章
 */
router.post("/", (req, res) => {
  api
    .createArticle(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "文章发布成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "文章发布失败"
      });
    });
});

/**
 * 更新文章
 */
router.put("/", (req, res) => {
  let { id } = req.body;
  api
    .updateArticle(id, req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "更新文章成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "更新文章失败"
      });
    });
});

/**
 * 删除文章
 * @param {number} id
 */
router.delete("/", (req, res) => {
  let { id } = req.body;
  api
    .removeArticle(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除文章成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "删除文章失败"
      });
    });
});

module.exports = router;
