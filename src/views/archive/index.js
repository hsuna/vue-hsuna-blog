/*
 * @Description 主入口
 * @Author: Hsuan
 * @Date: 2018-03-17 10:15:47
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-05-20 14:23:10
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Vue,
  store
} from "modules/general";
import App from "./App";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  template: "<App/>"
});
