/*
 * @Description: 文件接口-无权限
 * @Author: Hsuna
 * @Date: 2018-04-02 23:45:05
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 18:01:38
 */

import express from "express";
import fs from "fs";
import path from "path";
import config from "../../config";
import api from "../../api/article";

import { IncomingForm } from "formidable";
import { verifyRouteToken } from "../../utils/token";

const router = express.Router();

//递归创建目录 异步方法
const mkdirs = dirname => {
  return new Promise((resolve, reject) => {
    fs.exists(dirname, err => {
      if (err) return resolve(err);
      mkdirs(path.dirname(dirname)).then(() => {
        fs.mkdir(dirname, resolve);
      });
    });
  });
};

const unlink = id => {
  return new Promise((resolve, reject) => {
    const path = config.UPLOAD_PATH + "/upload_" + id
    fs.exists(path, exists => {
      exists ? fs.unlink(path, err => err ? reject(err) : resolve()) : resolve();
    })
  });
};

mkdirs(config.UPLOAD_PATH);

/**
 * 上传文件
 * @param {string} title
 */
router.post("/upload", verifyRouteToken, (req, res) => {
  //创建上传表单
  let form = new IncomingForm();
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = config.UPLOAD_PATH;
  form.keepExtensions = false; //保留后缀
  form.multiples = true; // 上传多个
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小 2M
  // 上传文件的入口文件
  form.parse(req, (err, fields, { file }) => {
    if (err) {
      console.log(err);
      res.send({
        code: -200,
        message: "文件上传失败"
      });
    } else {
      let { name } = path.parse(file.path);
      let id = name.replace("upload_", "");
      res.send({
        code: 200,
        message: "文件上传成功",
        data: {
          id,
          name: file.name,
          type: file.type
        }
      });
    }
  });
});

/**
 * 删除文件
 * @param {string} articleId
 * @param {string} id
 */
router.delete("/upload", verifyRouteToken, (req, res) => {
  let { articleId, id } = req.query;
  (articleId => {
    if (articleId) {
      return api
        .updateArticle(articleId, { files: { id } }, "$pull")
        .then(result => {
          return unlink(id);
        });
    } else {
      return unlink(id);
    }
  })(articleId)
    .then(result => {
      res.send({
        code: 200,
        message: "文件删除成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        code: -200,
        message: "文件删除失败"
      });
    });
});

export default router;
