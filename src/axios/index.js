/*
 * @Description axios拦截器自定义
 * @Author: Hsuan
 * @Date: 2018-03-17 10:09:18
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-05-20 15:07:25
 */

import Axios from "axios";
import store from "store";

import qs from "qs";

import { MutationName } from "store/types";
import { Message } from "element-ui";

Axios.defaults.timeout = 600000000;
Axios.defaults.withCredentials = true;
Axios.header = {
  "Content-Type": "application/x-www-form-urlencoded"
};

//添加请求拦截器
Axios.interceptors.request.use(
  config => {
    let { token } = store.getters;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    //在发送请求之前做某事
    // if (config.method === "post") {//序列化了，使用RESTful
    //   //POST传参序列化
    //   config.data = qs.stringify(config.data);
    // }
    return config;
  },
  err => {
    Message.error(err);
    //请求错误时做些事
    return Promise.reject(err);
  }
);

export default Axios;
