/* jshint esversion: 6 */
/*
 * @Description 
 * @Author: Hsuan 
 * @Date: 2018-03-17 10:13:19 
 * @Last Modified by: Hsuan 
 * @Last Modified time: 2018-03-17 10:13:19 
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import routes from "./routes";
const router = new VueRouter({
  mode: "history",
  routes
});

// 路由钩子
if (process.env.NODE_ENV === "production") {
  router.beforeEach((to, from, next) => {
    // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //   let isLogined = window.localStorage.getItem('isLogined');
    //   if (!isLogined || 'false' === isLogined) { //判断当前是否登录
    //     next({
    //       path: '/login',
    //       query: {
    //         redirect: to.fullPath
    //       } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //     });
    //   } else {
    //     next();
    //   }
    // } else {
    next();
    // }
  });
}

export default router;
