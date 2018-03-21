import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "./lib/mongo";

const { port } = mongoose(app);
const app = express();

//use-routes
import * as Routes from "./routes";
Object.keys(Routes).forEach(url => {
  app.use(url, Routes[url]);
});

//用body parser 来解析post和url信息中的参数
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
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
