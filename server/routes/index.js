/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-04 02:44:07
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 20:14:38
 */

import admin from "./admin";
import article from "./article";
import comment from "./comment";
import classify from "./classify";
import essay from "./essay";
import file from "./file";
import inventory from "./inventory";
import link from "./link";
import user from "./user";

let routes = {};

/**
 * 递归解析路径，解析多级路径
 * @param {object} route
 * @param {string} path 上级目录
 */
let analysisRoutes = function(route, path = "") {
  Object.keys(route).forEach(url => {
    if ("/" == url) {
      routes[path] = route[url];
    } else if ("function" === typeof route[url]) {
      routes[path + "/" + url] = route[url];
    } else {
      analysisRoutes(route[url], path + "/" + url);
    }
  });
};

analysisRoutes({
  admin,
  article,
  classify,
  comment,
  essay,
  file,
  inventory,
  link,
  user
});

export default routes;
