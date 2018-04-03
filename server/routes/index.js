import admin from "./admin";
import article from "./article";
import comment from "./comment";
import classify from "./classify";
import file from "./file";

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
  file
});

export default routes;
