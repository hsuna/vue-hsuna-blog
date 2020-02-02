/*
 * @Description axios拦截器自定义
 * @Author: Hsuan
 * @Date: 2018-03-17 10:09:18
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-20 10:27:42
 */
import Axios from "axios"
import store from "src/store"

import { MutationName } from "src/store/types";
import { Message } from "element-ui";

Axios.defaults.baseURL = process.env.API_HOST
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
)

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
        /* router.replace({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
        }); */
        break;
    }
    return res.data;
  },
  err => {
    //请求错误时做些事
    Message.error(err);
    return Promise.reject(err);
  }
)

export default Axios
