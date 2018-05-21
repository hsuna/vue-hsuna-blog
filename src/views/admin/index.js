/*
 * @Description 主入口
 * @Author: Hsuan
 * @Date: 2018-03-17 10:15:47
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-05-20 17:56:16
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Vue,
  Axios,
  store
} from "modules/general";
import App from "./App";

/**添加-vue路由器 */
import router from "./router";

//添加响应拦截器
Axios.interceptors.response.use(
  res => {
    switch (res.data.code) { //对响应数据做些事
      case -200:
        Message.error(res.data.message);
        break;
      case 401:
        // 这里写清除token的代码
        store.commit(MutationName.CLEAR_USER);
        router.replace({
          path: "/login",
          query: {
            redirect: router.currentRoute.fullPath
          } //登录成功后跳入浏览的当前页面
        });
        break;
    }
    return res.data;
  },
  err => {
    //请求错误时做些事
    Message.error(err);
    return Promise.reject(err);
  }
);

/* 引用-plugins */
import plugins from "@/plugins/el-admin";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
