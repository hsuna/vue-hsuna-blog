/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:33
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-25 23:55:38
 */

export default [
  {
    path: "/login",
    component: resolve => require(["views/login/Login.vue"], resolve)
  },
  {
    path: "/reg",
    component: resolve => require(["views/login/Reg.vue"], resolve)
  },
  {
    //后台路由
    type: "backend",
    path: "/admin",
    meta: { auth: true },
    component: resolve => require(["views/admin/Admin.vue"], resolve),
    name: "管理面板",
    children: [
      {
        path: "",
        component: resolve => require(["views/admin/Workspace.vue"], resolve),
        meta: { auth: true },
        hidden: true
      },
      {
        path: "articleList",
        component: resolve => require(["views/article/ArticleList.vue"], resolve),
        meta: { auth: true },
        name: "文章管理"
      },
      {
        path: "articleCreate",
        component: resolve => require(["views/article/ArticleCreate.vue"], resolve),
        meta: { auth: true },
        name: "创建文章",
        hidden: true
      },
      {
        path: "articleEdit/:articleId",
        component: resolve => require(["views/article/ArticleEdit.vue"], resolve),
        meta: { auth: true },
        name: "编辑文章",
        hidden: true
      },
      {
        path: "classifyList",
        component: resolve => require(["views/article/ClassifyList.vue"], resolve),
        meta: { auth: true },
        name: "分类管理"
      }
    ]
  }
];
