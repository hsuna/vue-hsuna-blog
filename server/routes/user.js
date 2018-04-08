import express from "express";

import { userInfoFilter } from "../utils/filters";

import api from "../api/user";

const app = express();
const router = express.Router();

/**
 * 获取用户信息
 * @param {Object} 
 */
router.get("/userInfo", (req, res) => {
  let { userName } = req.query;
  api
  .getUserByName(userName)
  .then(user => {
    if (!user) {
      return Promise.reject({ message: "获取用户信息失败，该用户不存在" });
    }else{
      res.send({
        code: 200,
        message: "获取用户信息成功",
        data: userInfoFilter(user)
      });
    }
  })
  .catch(err => {
    res.send({
      code: -200,
      message: err.message || "获取用户信息失败"
    });
  });
});

export default router;
