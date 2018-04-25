/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-25 02:43:59
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 22:09:13
 */

import express from "express";
import api from "../api/inventory";

const router = express.Router();

const guestFilter = ({ title, content, createdAt }) => ({
  title,
  content,
  createdAt
});

/**
 * 查找清单
 */
router.get("/", (req, res) => {
  let { page, limit } = req.query;
  api
    .getInventory(req.query, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          list: list.map(guestFilter),
          total: total || list.length
        }
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取清单失败"
      });
    });
});

export default router;
