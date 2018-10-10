/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:33
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:34
 */

export default [
  /////////////////前台路由////////////////
  {
    path: "/",
    component: resolve => require(["views/Main.vue"], resolve),
    children: [
      {
        name: "home",
        path: "/",
        meta: {
          title: "首页 | HSUAN"
        },
        component: resolve => require(["views/Home.vue"], resolve)
      },
      {
        name: "archive",
        path: "/archive",
        meta: {
          title: "归档 | HSUAN"
        },
        component: resolve => require(["views/Archive.vue"], resolve)
      },
      {
        name: "about",
        path: "/about",
        meta: {
          title: "关于我 | HSUAN"
        },
        component: resolve => require(["views/About.vue"], resolve)
      },
      {
        name: "essay",
        path: "/essay",
        meta: {
          title: "手札 | HSUAN"
        },
        component: resolve => require(["views/Essay.vue"], resolve)
      },

      {
        path: "/article/:articleId",
        meta: {
          title: "文章详情 | HSUAN"
        },
        component: resolve => require(["views/Article/index.vue"], resolve)
      }
    ]
  },

  /////////////////后台路由////////////////
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
    type: "backend",
    path: "/admin",
    meta: {
      title: "后台管理 | HSUAN",
      auth: true
    },
    component: resolve => require(["admin/Admin.vue"], resolve),
    name: "管理面板",
    children: [
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
        path: "articleList",
        component: resolve =>
          require(["admin/article/ArticleList.vue"], resolve),
        meta: {
          title: "文章管理 | HSUAN",
          auth: true
        },
        name: "文章管理"
      },
      {
        path: "articleCreate",
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
        path: "articleEdit/:articleId",
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
        path: "articleRead/:articleId",
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
        path: "classifyList",
        component: resolve =>
          require(["admin/article/ClassifyList.vue"], resolve),
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
    component: resolve => require(["admin/Admin.vue"], resolve),
    children: [
      {
        path: "list",
        component: resolve => require(["admin/essay/EssayList.vue"], resolve),
        meta: {
          title: "随记管理 | HSUAN",
          auth: true
        },
        name: "随记管理"
      },
      {
        path: "linkList",
        component: resolve => require(["admin/essay/LinkList.vue"], resolve),
        meta: {
          title: "链接管理 | HSUAN",
          auth: true
        },
        name: "链接管理"
      },
      {
        path: "inventoryList",
        component: resolve => require(["admin/essay/InventoryList.vue"], resolve),
        meta: {
          title: "清单管理 | HSUAN",
          auth: true
        },
        name: "清单管理"
      },

    ]
  },

  ///////////错误页面之类的//////////////
  {
    path: "*",
    meta: {
      title: "404 | HSUAN"
    },
    component: resolve => require(["views/common/404.vue"], resolve)
  }
];
