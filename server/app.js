import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongo from "./lib/mongo";

const app = express();
const { PORT } = mongo(app);

//use-routes
import Routes from "./routes";
Object.keys(Routes).forEach(key => {
  app.use('/api', Routes[key]);
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
app.listen(PORT);
console.log("Magic happens at http://localhost:" + PORT);
