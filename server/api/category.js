import express from "express";
import Category from "../modules/Category";

const router = express.Router();

/**
 * 查看所有分类
 */
router.get("/", (req, res) => {
  Category.find({}, (err, category) => {
    if (err) {
      res.json({ success: false, message: "查看分类失败" });
    } else {
      res.json({
        success: true,
        data: category
      });
    }
  });
});

/**
 * 添加分类
 * @param {string} title
 */
router.post("/", (req, res) => {
  let category = new Category({
    title: req.body.title
  });

  category.save(err => {
    if (err) {
      res.json({ success: false, message: "添加分类失败" });
    } else {
      res.json({ success: true, message: "添加分类成功" });
    }
  });
});

/**
 * 更新分类
 * @param {number} id
 * @param {string} title
 */
router.put("/", (req, res) => {
  let { title } = req.body;
  Category.findByIdAndUpdate(id, { title }, err => {
    if (err) {
      res.json({ success: false, message: "更新分类失败" });
    } else {
      res.json({ success: true, message: "更新分类成功" });
    }
  });
});

/**
 * 删除分类
 * @param {number} id
 */
router.delete("/", (req, res) => {
  let { id } = req.body;
  Category.findByIdAndRemove(id, err => {
    if (err) {
      res.json({ success: false, messge: "删除分类失败" });
    } else {
      res.json({ success: true, message: "删除分类成功" });
    }
  });
});

module.exports = router;
