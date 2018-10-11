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

/* 添加-axios拦截器 */
import Axios from "~/axios";
Vue.prototype.$http = Axios;

/**注册-全局mixin */
import mixin from "~/mixin";
Vue.mixin(mixin);

/**注册-全局过滤器 */
import * as Filters from "~/filters"; // global filters
Vue.prototype.$filter = Filters;
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});

/* 引用-plugins */
import plugins from "~/plugins/element-ui";
// Object.keys(Plugins).forEach(key => {
//   Vue.use(Plugins[key]);
// });

/* 引用-utils */
import utils from "~/utils";
Vue.prototype.$utils = utils;

/**添加-store */
import store from "~/store";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  template: "<App/>"
});
