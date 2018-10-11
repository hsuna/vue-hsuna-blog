/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:39:27
 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";
import routes from "./routes";
import { setDocumentTitle } from "utils/title";

Vue.use(VueRouter);
const router = new VueRouter({
  //mode: "history",
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
  if (undefined !== typeof meta.title) {
    setDocumentTitle(meta.title);
  }
  next();
});

export default router;
