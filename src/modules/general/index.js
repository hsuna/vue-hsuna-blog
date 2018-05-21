/*
 * @Description 主入口
 * @Author: Hsuan
 * @Date: 2018-03-17 10:15:47
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-05-20 16:37:41
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

/* 添加-axios拦截器 */
import Axios from "@/axios";
Vue.prototype.$http = Axios;

/**注册-全局mixin */
import mixin from "@/mixin";
Vue.mixin(mixin);

/**注册-全局过滤器 */
import Filters from "@/filters"; // global filters
Vue.prototype.$filter = Filters;
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});

/* 引用-fa字体库 */
import "font-awesome/scss/font-awesome.scss";
/* 引用-浏览器默认样式 */
import "assets/styles/reset.scss";

/**添加-store */
import store from "@/store";

Vue.config.productionTip = false;

export {
  Vue,
  Axios,
  store
};
