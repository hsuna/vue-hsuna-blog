import express from "express";
import User from "../models/user";

import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const router = express.Router();

/**
 * 登录用户
 */
router.post("/login", (req, res) => {
  let { name, password } = req.body;
  User.findOne({ name }, (err, user) => {
    //登录验证
    if (err) {
      res.json({ success: false, message: "登录失败" });
    } else if (!user) {
      res.json({ success: false, message: "认证失败，用户名找不到" });
    } else {
      if (user.password != password) {
        res.json({ success: false, message: "认证失败，密码错误" });
      } else {
        let token = jwt.sign({ name }, app.get("superSecret")); //获取token
        res.json({
          success: true,
          message: "恭喜，登录成功",
          token: token
        });
      }
    }
  });
});

module.exports = router;
