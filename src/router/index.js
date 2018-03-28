/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 02:55:29
 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";
import { StorageKey } from "store/types";
import routes from "./routes";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes
});

// 路由钩子
router.beforeEach(({ meta, path }, from, next) => {
  let isLogin = Boolean(store.state[StorageKey.USER].token);
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
