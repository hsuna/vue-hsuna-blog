/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-25 02:43:59
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 20:15:19
 */

import express from "express";
import api from "../api/link";

const router = express.Router();

const guestFilter = ({ name, url, createdAt }) => ({
  name,
  url,
  createdAt
});

/**
 * 查找链接
 */
router.get("/", (req, res) => {
  let { page, limit } = req.query;
  api
    .getLink(req.query, page, limit)
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
        message: "获取链接失败"
      });
    });
});

export default router;
