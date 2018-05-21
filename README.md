## [巽蓝的博客](http://blog.hsuna.com)

> VUE-单页面结构<br/>
> Hsuna's Blog~

--

### 项目启动

1.  `git clone https://github.com/hsuna/vue-hsuna-blog.git`
2.  安装依赖：`npm i`
3.  开发客户端：`npm run dev`或者`npm start`
4.  打包客户端：`npm run build`
5.  调试服务端：`npm run server_start`
6.  测试服务端：`npm run server_dev`
7.  生产服务端：`npm run server_prod`

### 项目结构

* 客户端

```
./
├── build                       // 构建目录
├── config                      // 配置目录
├── server                      // 服务端目录
├── src                         // 项目目录
│   ├── admin                   // 后台页面目录
│   ├── api                     // API目录
│   ├── assets                  // 动态资源目录
│   ├── axios                   // 通信代理
│   ├── components              // 公共组件
│   ├── filters                 // 过滤器|管道器
│   ├── mixin                   // 混合器
│   ├── plugins                 // 插件，框架
│   ├── router                  // 路由
│   ├── store                   // 状态管理目录
│   ├── utils                   // 工具库
│   ├── views                   // 前台页面目录
│   ├── App.vue                 // 主页面
│   └── main.js                 // 主入口
├── static                      // 静态资源目录，不参与打包
├── index.html                  // 模板页面
└── package.json                // 项目配置信息
```

* 服务端
```
./
├── server
│   ├── api                     // restrul API
│   ├── config                  // 配置目录
│   ├── lib                     // mongo库目录
│   ├── models                  // 模型
│   ├── routes                  // 路由
│   ├── utils                   // 工具类
│   ├── app.js                  // 主入口
│   └── start.js                // 启动文件
├── ecosystem.config.js         // pmp2配置信息
└── package.json                // 项目配置信息
```

### 项目说明

1. 由vue-cli生成的单页面结构进行开发；
2. 后台使用mongo作为数据存储，使用RESTful API进行开发接口；