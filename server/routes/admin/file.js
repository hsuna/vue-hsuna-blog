/*
 * @Description: 文件接口-无权限
 * @Author: Hsuna
 * @Date: 2018-04-02 23:45:05
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 00:19:13
 */

import express from "express";
import fs from "fs";

import { UPLOAD_PATH } from "../../config";
import { verifyRouteToken } from "../../utils/token";
import { timeStampFormat } from "../../utils/date";

const router = express.Router();

const getNowDatePath = () => {
  let timeStamp = Date.now();
  let random = Math.floor(Math.random() * 10000);
  return {
    dirPath: timeStampFormat(timeStamp, "yyyy-MM-dd"),
    fileName: timeStampFormat(timeStamp, "yyyyMMddhhmmss") + random
  };
};

const fileRemove = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    // 移动文件
    fs.rename(oldPath, newPath, err => {
      if (err) {
        reject(err);
      } else {
        // 删除临时文件夹文件,
        fs.unlink(oldPath, err => {
          if (err) reject(err);
          else resolve();
        });
      }
    });
  });
};

/**
 * 上传文件
 * @param {string} title
 */
router.post("/upload", verifyRouteToken, (req, res) => {
  // 生成新的文件目录及文件名
  let { dirPath, fileName } = getNowDatePath();
  // 获得文件的临时路径
  let tmpPath = req.files.thumbnail.path;
  let targetPath = UPLOAD_PATH + dirPath + "/" + fileName;

  fileRemove(tmpPath, targetPath)
    .then(() => {
      res.send({
        code: 200,
        message: "文件上传成功",
        data: {
          path: dirPath + "/" + fileName
        }
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "文件上传失败"
      });
    });
});
