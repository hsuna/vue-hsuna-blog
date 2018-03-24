/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-25 01:36:52
 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";
import routes from "./routes";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes
});

// 路由钩子
if (process.env.NODE_ENV === "production") {
  router.beforeEach(({ meta, path }, from, next) => {
    if (true === meta.auth) {
      if (Boolean(store.state.token)) {
        if (path == "/login" || path == "/reg") {
          return next({ path: "/admin" });
        }
      } else if (path !== "/login") {
        return next({ path: "/login" });
      }
    }
    next();
  });
}

export default router;
