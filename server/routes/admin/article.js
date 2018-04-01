import express from "express";
import api from "../../api/article";

import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

/**
 * 查找文章
 */
router.get("/", verifyRouteToken, (req, res) => {
  let { page, limit } = req.query;
  api
    .getArticle(req.query, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          list: Array.isArray(list) ? list : [list],
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
 * 创建文章
 */
router.post("/", verifyRouteToken, (req, res) => {
  api
    .createArticle(req.body)
    .then(result => {
      if (1 == result._doc.status) {
        res.send({
          code: 200,
          message: "文章发布成功"
        });
      } else {
        res.send({
          code: 200,
          message: "文章保存成功"
        });
      }
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
router.put("/", verifyRouteToken, (req, res) => {
  let { id } = req.body;
  req.body.updatedAt = Date.now();
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
router.delete("/", verifyRouteToken, (req, res) => {
  let { id } = req.query;
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

export default router;
