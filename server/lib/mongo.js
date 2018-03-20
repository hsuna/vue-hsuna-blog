import mongoose from "mongoose";
import config from "../config"; //读取配置文件config.js信息

const db = mongoose.connect(config.DATABASE); // 连接数据库

/** 连接成功 */
db.on("connected", () => {
  console.log("Mongoose connection open to " + config.DATABASE);
});

/** 连接异常 */
db.on("error", err => {
  console.log('Mongoose connection error: ' + err);
});

/** 连接断开 */
db.on("error", err => {
  console.log('Mongoose connection error: ' + err);
});

export default mongoose;
