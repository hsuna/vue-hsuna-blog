/* jshint esversion: 6 */
/*
 * @Description axios拦截器自定义
 * @Author: Hsuan
 * @Date: 2018-03-17 10:09:18
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-25 12:57:24
 */

import Axios from "axios";
import store from "store";
import router from "@/router";

import qs from "qs";

import { Message } from "element-ui";

Axios.defaults.timeout = 600000000;
Axios.defaults.withCredentials = true;
Axios.header = {
  "Content-Type": "application/x-www-form-urlencoded"
};

//添加请求拦截器
Axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = store.state.token;
    }
    //在发送请求之前做某事
    if (config.method === "post") {
      //POST传参序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    Message.error(err);
    //请求错误时做些事
    return Promise.reject(err);
  }
);

//添加响应拦截器
Axios.interceptors.response.use(
  res => {
    switch (res.data.code) { //对响应数据做些事
      case -200:
        Message.error(res.data.message);
        break;
      case 401:
        // 这里写清除token的代码
        router.replace({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
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

export default Axios;
