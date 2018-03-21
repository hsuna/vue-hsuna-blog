import express from "express";
import jwt from "jsonwebtoken";
import api from "../api/user";

const app = express();
const router = express.Router();

/**
 * 登录用户
 */
router.post("/login", (req, res) => {
  let { name, password } = req.body;
  api
    .getUserByName(name)
    .then(result => {
      if (err) {
        res.send({
          code: -200,
          message: "登录失败"
        });
      } else if (!result) {
        res.send({
          code: -200,
          message: "认证失败，用户名找不到"
        });
      } else {
        if (result.password != password) {
          res.send({
            code: -200,
            message: "认证失败，密码错误"
          });
        } else {
          let token = jwt.sign({ name }, app.get("superSecret")); //获取token
          res.send({
            code: 200,
            message: "恭喜，登录成功",
            token: token
          });
        }
      }
    })
    .catch(err => {});
});

export default router;
