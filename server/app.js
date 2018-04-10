import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongo from "./lib/mongo";

const app = express();
const { PORT, API_HOST } = mongo(app);

//用body parser 来解析post和url信息中的参数
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//use-routes
import Routes from "./routes";
//基础路由
app.get(API_HOST, (req, res) => {
  res.send("这里是nodejs+mongodb编写restfulAPI的笔记！");
});

Object.keys(Routes).forEach(url => {
  let fullpath = path.join(API_HOST, url);
  console.log(fullpath);
  app.use(fullpath, Routes[url]);
});


// 启动服务
app.listen(PORT);
console.log("Magic happens at http://localhost:" + PORT);
