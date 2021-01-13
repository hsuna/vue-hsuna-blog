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
    path: "/login",
    meta: {
      title: "登录 | HSUAN"
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/reg",
    meta: {
      title: "注册 | HSUAN"
    },
    component: () => import("../views/Reg.vue")
  },
  {
    path: "/",
    redirect: "/admin",
  },
  {
    type: "backend",
    path: "/admin",
    meta: {
      title: "后台管理 | HSUAN",
      auth: true
    },
    component: () => import("../views/admin/index.vue"),
    name: "文章管理",
    children: [
      {
        path: "/",
        component: () => import("../views/Main.vue"),
        meta: {
          title: "后台管理 | HSUAN",
          auth: true
        },
        hidden: true
      },
      {
        path: "articleList",
        component: () => import("../views/article/ArticleList.vue"),
        meta: {
          title: "文章管理 | HSUAN",
          auth: true
        },
        name: "文章管理"
      },
      {
        path: "articleCreate",
        component: () => import("../views/article/ArticleCreate.vue"),
        meta: {
          title: "创建文章 | HSUAN",
          auth: true
        },
        name: "创建文章",
        hidden: true
      },
      {
        path: "articleEdit/:articleId",
        component: () => import("../views/article/ArticleEdit.vue"),
        meta: {
          title: "编辑文章 | HSUAN",
          auth: true
        },
        name: "编辑文章",
        hidden: true
      },
      {
        path: "articleRead/:articleId",
        component: () => import("../views/article/ArticleRead.vue"),
        meta: {
          title: "查看文章 | HSUAN",
          auth: true
        },
        name: "查看文章",
        hidden: true
      },
      {
        path: "classifyList",
        component: () => import("../views/article/ClassifyList.vue"),
        meta: {
          title: "分类管理 | HSUAN",
          auth: true
        },
        name: "分类管理"
      }
    ]
  },
  {
    type: "backend",
    path: "/essay",
    meta: {
      title: "后台管理 | HSUAN",
      auth: true
    },
    name: "手札管理",
    component: () => import("../views/admin/index.vue"),
    children: [
      {
        path: "list",
        component: () => import("../views/essay/EssayList.vue"),
        meta: {
          title: "随记管理 | HSUAN",
          auth: true
        },
        name: "随记管理"
      },
      {
        path: "linkList",
        component: () => import("../views/essay/LinkList.vue"),
        meta: {
          title: "链接管理 | HSUAN",
          auth: true
        },
        name: "链接管理"
      },
      {
        path: "inventoryList",
        component: () => import("../views/essay/InventoryList.vue"),
        meta: {
          title: "清单管理 | HSUAN",
          auth: true
        },
        name: "清单管理"
      },

    ]
  },
];
