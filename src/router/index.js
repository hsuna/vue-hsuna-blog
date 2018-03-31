/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-31 19:58:25
 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";
import { StoreKey } from "store/types";
import routes from "./routes";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes
});

// 路由钩子
router.beforeEach(({ meta, path }, from, next) => {
  let { isLogin } = store.getters;
  if (path == "/login" || path == "/reg") {
    if (isLogin) {
      return next({ path: "/admin" });
    }
  } else if (true === meta.auth) {
    if (!isLogin) {
      return next({ path: "/login" });
    }
  }
  next();
});

export default router;
