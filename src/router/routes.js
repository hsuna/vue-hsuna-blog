/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:33
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-26 17:58:00
 */

export default [
  /////////////////前台路由////////////////
  {
    path: "/",
    component: resolve => require(["views/Main.vue"], resolve),
    children: [
      {
        path: "/",
        component: resolve => require(["views/Home.vue"], resolve)
      },
      {
        path: "/article",
        component: resolve => require(["views/Article.vue"], resolve)
      },
      {
        path: "/comment",
        component: resolve => require(["views/Comment.vue"], resolve)
      },
      {
        path: "/about",
        component: resolve => require(["views/About.vue"], resolve)
      }
    ]
  },

  /////////////////后台路由////////////////
  {
    path: "/login",
    component: resolve => require(["admin/Login.vue"], resolve)
  },
  {
    path: "/reg",
    component: resolve => require(["admin/Reg.vue"], resolve)
  },
  {
    type: "backend",
    path: "/admin",
    meta: {
      auth: true
    },
    component: resolve => require(["admin/Admin.vue"], resolve),
    name: "管理面板",
    children: [
      {
        path: "",
        component: resolve => require(["admin/Workspace.vue"], resolve),
        meta: {
          auth: true
        },
        hidden: true
      },
      {
        path: "articleList",
        component: resolve => require(["admin/article/ArticleList.vue"], resolve),
        meta: {
          auth: true
        },
        name: "文章管理"
      },
      {
        path: "articleCreate",
        component: resolve => require(["admin/article/ArticleEdit.vue"], resolve),
        meta: {
          auth: true
        },
        name: "创建文章",
        hidden: true
      },
      {
        path: "articleEdit/:articleId",
        component: resolve => require(["admin/article/ArticleEdit.vue"], resolve),
        meta: {
          auth: true
        },
        name: "编辑文章",
        hidden: true
      },
      {
        path: "classifyList",
        component: resolve => require(["admin/article/ClassifyList.vue"], resolve),
        meta: {
          auth: true
        },
        name: "分类管理"
      }
    ]
  }
];
