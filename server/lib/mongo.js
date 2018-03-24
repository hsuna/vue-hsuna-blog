import mongoose from "mongoose";
import config from "../config"; //读取配置文件config.js信息
import express from "express";

const mongo = app => {
  mongoose.Promise = Promise;

  /**单个数据库连接 */
  mongoose.connect(config.DATABASE, err => {
    if (err) {
      console.log("Mongoose connection error: " + err);
    } else {
      console.log("Mongoose connection open to " + config.DATABASE);
    }
  });

  /**多个数据库连接 */
  //const db = mongoose.createConnection(config.DATABASE); // 连接数据库

  /** 连接成功 */
  // db.on("connected", () => {
  //   console.log("Mongoose connection open to " + config.DATABASE);
  // });

  // /** 连接异常 */
  // db.on("error", err => {
  //   console.log("Mongoose connection error: " + err);
  // });

  // /** 连接断开 */
  // db.on("error", err => {
  //   console.log("Mongoose connection error: " + err);
  // });

  return config;
};

export default mongo;
