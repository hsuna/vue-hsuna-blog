import express from "express";

import { verifyHash } from "../../utils/hash";
import { signToken } from "../../utils/token";

import api from "../../api/user";

const app = express();
const router = express.Router();

/**初始化，建立管理员 */
router.get("/setup", (req, res) => {
  let admin = {
    name: "hsuna",
    password: "123456",
    admin: true
  }; //创建管理员

  api
    .getUserByName(admin.name)
    .then(model => {
      if (model) {
        return Promise.reject({ message: "该账号已存在" });
      } else {
        return api.createUser(admin);
      }
    })
    .then(model => {
      res.send({
        code: 200,
        message: "管理员创建成功"
      });
    })
    .catch(err => {
      res.send({
        code: 401,
        message: err.message || "管理员创建失败"
      });
    });
});

/**
 * 登录用户
 */
router.post("/login", (req, res) => {
  let { name, password } = req.query;
  api
    .getUserByName(name)
    .then(model => {
      if (!model) {
        return Promise.reject({ message: "认证失败，用户名找不到" });
      }
      verifyHash(password, model.password)
        .then(() => {
          res.send({
            code: 200,
            message: "恭喜，登录成功",
            token: signToken(model.id)
          });
        })
        .catch(err => {
          return Promise.reject({ message: "认证失败，密码错误" });
        });
    })
    .catch(err => {
      res.send({
        code: 401,
        message: err.message || "登录失败"
      });
    });
});

export default router;
