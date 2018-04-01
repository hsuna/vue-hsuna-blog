/* jshint esversion: 6 */
/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 23:12:39
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

/**
 * 兼容微信设置页面的title
 */
const setDocumentTitle = title => {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    let i = document.createElement("iframe");
    i.src = "/favicon.ico";
    i.style.display = "none";
    i.onload = function() {
      setTimeout(function() {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

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
