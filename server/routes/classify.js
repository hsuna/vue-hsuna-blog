import express from "express";
import api from "../api/classify";

const router = express.Router();

/**
 * 查看所有分类
 */
router.get("/all", (req, res) => {
  api
    .getAllClassify()
    .then(result => {
      res.send({
        code: 200,
        data: result
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
router.post("/", (req, res) => {
  api
    .createClassify(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "添加分类成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "添加分类失败"
      });
    });
});

/**
 * 更新分类
 * @param {number} id
 * @param {string} title
 */
router.put("/", (req, res) => {
  let { id } = req.body;
  api
    .updateClassify(id, req.body)
    .then(result => {
      res.send({
        code: 200,
        message: "更新分类成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "更新分类失败"
      });
    });
});

/**
 * 删除分类
 * @param {number} id
 */
router.delete("/", (req, res) => {
  let { id } = req.body;
  api
    .removeClassify(id)
    .then(result => {
      res.send({
        code: 200,
        message: "删除分类失败"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "删除分类成功"
      });
    });
});

export default router;
