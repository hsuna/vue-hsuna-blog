/* jshint esversion: 6 */
/*
 * @Description 主入口
 * @Author: Hsuan 
 * @Date: 2018-03-17 10:15:47 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-17 10:16:09
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

/**添加-vue路由器 */
import Router from "./router";

/**添加- */
import Store from "./store";

/* 添加-axios拦截器 */
import Axios from './axios';
Vue.prototype.$http = Axios;

/**注册-全局mixin */
import mixin from "./mixin";
Vue.mixin(mixin);

/**注册-全局过滤器 */
import * as Filters from "./filters"; // global filters
Vue.prototype.$filter = Filters;
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});

/* 引用-element-ui */
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  Router,
  Store,
  components: {
    App
  },
  template: "<App/>"
});
