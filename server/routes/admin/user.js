import express from "express";

import { verifyHash } from "../../utils/hash";
import { verifyRouteToken } from "../../utils/token";
import { userInfoFilter } from "../../utils/filters";

import config from "../../config";
import api from "../../api/user";

const app = express();
const router = express.Router();

/**
 * 修改密码
 */
router.put("/password", verifyRouteToken, (req, res) => {
  let { userName, oldPass, newPass } = req.body;
  let id;
  api
    .getUserByName(userName)
    .then(user => {
      if (!user) {
        return Promise.reject({ message: "修改密码失败，该用户不存在" });
      }else{
        id = user.id;
        return verifyHash(oldPass, user.password);
      }
    })
    .then(bol => {
      if(bol){
        return api.updateUserById(id, { password: newPass });
      }else{
        return Promise.reject({ message: "修改密码失败，旧密码不一致" });
      }
    })
    .then(() => {
      res.send({
        code: 200,
        message: "修改密码成功，请重新登录！",
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.message || "修改密码失败"
      });
    });
});

/**
 * 获取用户信息
 * @param {Object} 
 */
router.get("/userInfo", verifyRouteToken, (req, res) => {
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

/**
 * 更新用户信息
 * @param {Object} 
 */
router.put("/userInfo", verifyRouteToken, (req, res) => {
  let { name, nickname, job, introduction } = req.body;
  api
  .updateUserByName(name, { nickname, job, introduction })
  .then(() => {
    res.send({
      code: 200,
      message: "修改用户信息成功"
    });
  })
  .catch(err => {
    console.log(err);
    res.send({
      code: -200,
      message: "修改用户信息失败"
    });
  });
});

/**
 * 更新头像
 * @param {string} title
 */
router.put("/portrait", verifyRouteToken, (req, res) => {
  let { userName } = req.body;
  
  //创建上传表单
  let form = new IncomingForm();
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = config.UPLOAD_PATH;
  form.keepExtensions = false; //保留后缀
  form.multiples = false; // 上传多个
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小 2M
  // 上传文件的入口文件
  form.parse(req, (err, fields, { file }) => {
    if (err) {
      console.log(err);
      res.send({
        code: -200,
        message: "头像上传失败"
      });
    } else {
      let fileId = path.parse(file.path).name.replace("upload_", "");
      api
      .updateUserByName(userName, { portrait: fileId })
      .then(() => {
        res.send({
          code: 200,
          message: "修改头像成功",
          fileId
        });
      })
      .catch(err => {
        res.send({
          code: -200,
          message: "修改头像失败"
        });
      });
    }
  });
});


/**
 * 更新banner图
 * @param {string} title
 */
router.put("/banner", verifyRouteToken, (req, res) => {
  let { userName } = req.body;

  //创建上传表单
  let form = new IncomingForm();
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = config.UPLOAD_PATH;
  form.keepExtensions = false; //保留后缀
  form.multiples = false; // 上传多个
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小 2M
  // 上传文件的入口文件
  form.parse(req, (err, fields, { file }) => {
    if (err) {
      console.log(err);
      res.send({
        code: -200,
        message: "图片上传失败"
      });
    } else {
      let fileId = path.parse(file.path).name.replace("upload_", "");
      api
      .updateUserByName(userName, { banner: fileId })
      .then(() => {
        res.send({
          code: 200,
          message: "图片修改成功",
          fileId
        });
      })
      .catch(err => {
        res.send({
          code: -200,
          message: "图片更新失败"
        });
      });
    }
  });
});

export default router;
