import express from "express";
import { Article } from "../models";

const router = express.Router();

/**
 * 获取所有博客
 * @param {object} req
 * @param {object} res
 */
router.get("/", (req, res) => {
  // 根据分类查找
  let { category } = req.query;
  let whereObj = {};
  if (category) {
    let reg = new RegExp("^" + category + "$");
    whereObj = { category: reg };
  }

  Article.find(whereObj, function(err, articles) {
    res.json({
      success: true,
      data: articles
    });
  });
});

/**
 * 创建文章
 * @param {object} req
 * @param {object} res
 */
router.post("/", (req, res) => {
  const { title, body, author, tags, hidden, category } = req.body;

  if (title.length < 3) {
    res.json({
      success: false,
      message: "标题长度不能小于3"
    });
  }

  let article = new Article({
    title,
    body,
    author,
    tags: tags.split(",").map(title => ({ title })), // 把标签分割成数组格式
    hidden,
    category
  });

  article.save(err => {
    if (err) {
      res.json({ success: false, messafe: "博客发布失败" });
    }
    res.json({ success: true, message: "博客发布成功" });
  });
});

/**
 * 修改文章
 * @param {object} req
 * @param {object} res
 */
router.put("/", () => {
  const { title, newTitle, body, newBody, author, newAuthor } = req.body;
  if (newTitle.length < 3) {
    res.json({
      success: false,
      message: "标题长度不能小于3"
    });
  }
  Article.update(
    { title, body, author },
    {
      title: newTitle,
      body: newBody,
      author: newAuthor
    },
    (err, blog) => {
      if (err) {
        res.json({
          success: false,
          message: "更新博客失败"
        });
      }
    }
  );
  res.json({
    success: true,
    message: "更新博客成功"
  });
});

/**
 * 删除文章
 * @param {object} req
 * @param {object} res
 */
router.delete("/", (req, res) => {
  const { title } = req.body;

  Article.remove({ title }, err => {
    if (err) {
      res.json({
        success: false,
        messge: "删除博客失败！"
      });
    }
  });
  res.json({
    success: true,
    message: "删除博客成功！"
  });
});

module.exports = router;
