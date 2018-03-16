// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "./router";
import Store from "./store";

/* 添加axios拦截器 */
import Axios from './axios';
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

/* 引用element-ui */
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element);

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
