import express from "express";
import api from "../api/article";

const router = express.Router();

/**
 * 查找文章
 */
router.get("/", (req, res) => {
  api
    .getArticles(req.query)
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
