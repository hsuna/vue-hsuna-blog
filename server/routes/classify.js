import express from "express";
import api from "../api/classify";

const router = express.Router();

/**
 * 查看所有分类
 */
router.get("/", (req, res) => {
  api
    .getAllClassify()
    .then(result => {
      res.send({
        code: 200,
        data: result.map(({ title }) => title)
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取分类失败"
      });
    });
});

export default router;
