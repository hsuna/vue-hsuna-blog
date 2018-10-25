/*
 * @Description: 文件接口-无权限
 * @Author: Hsuna
 * @Date: 2018-04-02 23:45:05
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 13:49:21
 */

import express from "express";
import fs from "fs";
import config from "../config";

const router = express.Router();

/**
 * 上传文件
 * @param {string} title
 */
router.get("/upload/:id", (req, res) => {
  let filePath = config.UPLOAD_PATH + "/upload_" + req.params.id;

  let exists = fs.existsSync(filePath);
  if(exists){
    //设置请求的返回头type,content的type类型列表见上面
    res.setHeader("Content-Type", {
      gif: "image/gif",
      ico: "image/x-icon",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      png: "image/png",
      svg: "image/svg+xml",
      tiff: "image/tiff"
    });
    //格式必须为 binary 否则会出错
    let content = fs.readFileSync(filePath, "binary");
    res.writeHead(200, "Ok");
    res.write(content, "binary"); //格式必须为 binary，否则会出错
  }else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
  }
  res.end();
});

export default router;
