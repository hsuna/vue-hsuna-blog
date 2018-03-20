import express from "express";
import { Article } from "../models";

const router = express.Router();

/**
 * 获取所有文章
 * @param {string} category
 */
router.get("/", (req, res) => {
  // 根据分类查找
  let { category } = req.query;
  let whereObj = {};
  if (category) {
    let reg = new RegExp("^" + category + "$");
    whereObj = { category: reg };
  }

  Article.find(whereObj, (err, article) => {
    if (err) {
      res.json({ success: false, message: "获取文章失败" });
    } else {
      res.json({ success: true, data: article });
    }
  });
});

/**
 * 创建文章
 * @param {string} title
 * @param {string} body
 * @param {string} author
 * @param {array} tags
 * @param {string} category
 */
router.post("/", (req, res) => {
  const { title, body, author, tags, hidden, category } = req.body;

  if (title.length < 3) {
    res.json({ success: false, message: "标题长度不能小于3" });
  }

  let article = new Article({
    title,
    body,
    author,
    tags: tags.split(","), // 把标签分割成数组格式
    hidden,
    category
  });

  article.save(err => {
    if (err) {
      res.json({ success: false, message: "文章发布失败" });
    } else {
      res.json({ success: true, message: "文章发布成功" });
    }
  });
});

/**
 * 更新文章
 * @param {string} id
 * @param {string} title
 * @param {string} body
 * @param {string} category
 */
router.put("/", (req, res) => {
  const { id, title, body, category } = req.body;

  if (title.length < 3) {
    res.json({ success: false, message: "标题长度不能小于3" });
  }

  Article.findByIdAndUpdate(id, { title, body, category }, err => {
    if (err) {
      res.json({ success: false, message: "更新文章失败" });
    } else {
      res.json({ success: true, message: "更新文章成功" });
    }
  });
});

/**
 * 删除文章
 * @param {number} id
 */
router.delete("/", (req, res) => {
  const { id } = req.body;

  Article.findByIdAndRemove(id, err => {
    if (err) {
      res.json({ success: false, messge: "删除文章失败！" });
    } else {
      res.json({ success: true, message: "删除文章成功！" });
    }
  });
});

module.exports = router;
