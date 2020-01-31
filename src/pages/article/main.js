/*
 * @Description 主入口
 * @Author: Hsuan
 * @Date: 2018-03-17 10:15:47
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-28 00:36:21
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

/**添加-store */
import store from "src/store";

/* 引用-plugins */
import Api from "src/plugins/axios"
Vue.prototype.$http = Api

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
