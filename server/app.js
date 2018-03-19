import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; //用来创建和确认用户信息摘要
import config from "./config/config"; //读取配置文件config.js信息
import routes from "./routes";

const app = express();
routes(app);

//一些配置
const port = process.env.PORT || 8080; // 设置启动端口
mongoose.connect(config.database); // 连接数据库
app.set("superSecret", config.secret); // 设置app 的超级密码--用来生成摘要的密码

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan("dev"));

//路由
//基础路由
app.get("/", (req, res) => {
  res.send("这里是nodejs+mongodb编写restfulAPI的笔记！");
});

// 启动服务
app.listen(port);
console.log("Magic happens at http://localhost:" + port);
