/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:33
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:34
 */

export default [
  /////////////////后台路由////////////////
  {
    path: "/",
    component: resolve => require(["admin/Main.vue"], resolve),
    meta: {
      title: "后台管理 | HSUAN",
      auth: true
    },
    hidden: true
  },
  {
    path: "/login",
    meta: {
      title: "登录 | HSUAN"
    },
    component: resolve => require(["admin/Login.vue"], resolve)
  },
  {
    path: "/reg",
    meta: {
      title: "注册 | HSUAN"
    },
    component: resolve => require(["admin/Reg.vue"], resolve)
  },
  {
    path: "article/articleList",
    component: resolve =>
      require(["admin/article/ArticleList.vue"], resolve),
    meta: {
      title: "文章管理 | HSUAN",
      auth: true
    },
    name: "文章管理"
  },
  {
    path: "article/articleCreate",
    component: resolve =>
      require(["admin/article/ArticleCreate.vue"], resolve),
    meta: {
      title: "创建文章 | HSUAN",
      auth: true
    },
    name: "创建文章",
    hidden: true
  },
  {
    path: "article/articleEdit/:articleId",
    component: resolve =>
      require(["admin/article/ArticleEdit.vue"], resolve),
    meta: {
      title: "编辑文章 | HSUAN",
      auth: true
    },
    name: "编辑文章",
    hidden: true
  },
  {
    path: "article/articleRead/:articleId",
    component: resolve =>
      require(["admin/article/ArticleRead.vue"], resolve),
    meta: {
      title: "查看文章 | HSUAN",
      auth: true
    },
    name: "查看文章",
    hidden: true
  },
  {
    path: "article/classifyList",
    component: resolve =>
      require(["admin/article/ClassifyList.vue"], resolve),
    meta: {
      title: "分类管理 | HSUAN",
      auth: true
    },
    name: "分类管理"
  },
  {
    path: "essay/list",
    component: resolve => require(["admin/essay/EssayList.vue"], resolve),
    meta: {
      title: "随记管理 | HSUAN",
      auth: true
    },
    name: "随记管理"
  },
  {
    path: "essay/linkList",
    component: resolve => require(["admin/essay/LinkList.vue"], resolve),
    meta: {
      title: "链接管理 | HSUAN",
      auth: true
    },
    name: "链接管理"
  },
  {
    path: "essay/inventoryList",
    component: resolve => require(["admin/essay/InventoryList.vue"], resolve),
    meta: {
      title: "清单管理 | HSUAN",
      auth: true
    },
    name: "清单管理"
  }
];
