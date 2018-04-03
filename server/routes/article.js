/*
 * @Description 文章接口-无权限
 * @Author: Hsuan
 * @Date: 2018-03-27 09:57:58
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 21:02:32
 */

import express from "express";
import api from "../api/article";
import { guestBaseFilter, guestDetailFilter } from "../utils/filters";

const router = express.Router();

/**
 * 查找文章
 */
router.get("/", (req, res) => {
  let { page, limit } = req.query;
  Object.assign(req.query, {
    status: 1, //访客模式只能阅读公开的文章
    sort: { publishAt: -1 } //根据发布时间降序
  });
  api
    .getArticle(req.query, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          //id查询直接返回数据
          list: (Array.isArray(list) ? list : [list]).map(guestBaseFilter),
          total: total || list.length || 0
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "获取文章失败"
      });
    });
});

/**
 * 查找热门文章
 */
router.get("/hot", (req, res) => {
  let { limit = 5 } = req.query;
  Object.assign(req.query, {
    status: 1, //访客模式只能阅读公开的文章
    sort: { comments_count: -1, viewCount: -1 } //根据评论条数及浏览次数降序
  });
  api
    .getArticle(req.query, 1, limit)
    .then(result => {
      let [list] = result;
      res.send({
        code: 200,
        data: list.map(guestBaseFilter)
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "获取文章失败"
      });
    });
});

/**
 * 查找文章详情
 */
router.get("/detail", (req, res) => {
  let { id } = req.query;
  api
    .getArticle({ id })
    .then(result => {
      let [article] = result;
      //访客模式只能阅读公开的文章
      if (1 == article.status) {
        res.send({
          code: 200,
          data: guestDetailFilter(article)
        });
      } else {
        res.send({
          code: -200,
          message: "查找文章失败"
        });
      }
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "该文章不存在"
      });
    });
});

/**
 * 查找相关文章
 */
router.get("/relate", (req, res) => {
  let { classify, page = 1, limit = 5 } = req.query;
  api
    .getArticle({ classify, status: 1, sort: { publishAt: -1 } }, page, limit)
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          //id查询直接返回数据
          list: (Array.isArray(list) ? list : [list]).map(guestBaseFilter),
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
 * 查找文章归档
 */
router.get("/achive", (req, res) => {
  let { year, month, page = 1, limit = 8 } = req.query;
  api
    .getArticle(
      {
        status: 1,
        publishAt: {
          $gt: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 0)
        },
        sort: { publishAt: -1 }
      },
      page,
      limit
    )
    .then(result => {
      let [list, total] = result;
      res.send({
        code: 200,
        data: {
          //id查询直接返回数据
          list: (Array.isArray(list) ? list : [list]).map(guestBaseFilter),
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
 * 更新浏览次数
 */
router.put("/viewCount", (req, res) => {
  let { id } = req.body;
  api
    .updateArticle(id, { viewCount: req.body.viewCount })
    .then(result => {
      res.send({
        code: 200,
        message: "更新次数成功"
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "更新次数成功"
      });
    });
});

/**
 * 获取所有类型的数量
 * @param {object} match
 */
router.get("/classifyCount", (req, res) => {
  Object.assign(req.query, { status: 1 }); //游客模式只能阅读公开的文章
  api
    .getArticleByAggregate([
      { $match: req.query },
      { $group: { _id: "$classify", count: { $sum: 1 } } }
    ])
    .then(result => {
      res.send({
        code: 200,
        data: result
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取统计数量失败"
      });
    });
});

/**
 * 获取所有归档的数量
 * @param {object} match
 */
router.get("/achiveCount", (req, res) => {
  Object.assign(req.query, { status: 1 }); //游客模式只能阅读公开的文章
  api
    .getArticleByAggregate([
      { $match: req.query },
      {
        $group: {
          _id: {
            year: { $year: "$publishAt" },
            month: { $month: "$publishAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ])
    .then(result => {
      res.send({
        code: 200,
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "获取归档数量失败"
      });
    });
});

export default router;
