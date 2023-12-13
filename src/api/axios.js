/*
 * @Description axios拦截器自定义
 * @Author: Hsuan
 * @Date: 2018-03-17 10:09:18
 * @Last Modified by: Hsuna
 * @Last Modified time: 2021-05-08 18:42:54
 */
import Axios from "axios"

import { ElMessage } from "element-plus";

Axios.defaults.baseURL = import.meta.env.VITE_BFF_API;
Axios.defaults.timeout = 600000000;
Axios.defaults.withCredentials = true;
Axios.header = {
  "Content-Type": "application/x-www-form-urlencoded"
};

//添加请求拦截器
Axios.interceptors.request.use(
  config => {
    //在发送请求之前做某事
    // if (config.method === "post") {//序列化了，使用RESTful
    //   //POST传参序列化
    //   config.data = qs.stringify(config.data);
    // }
    return config;
  },
  err => {
    ElMessage.error(err);
    //请求错误时做些事
    return Promise.reject(err);
  }
)

//添加响应拦截器
Axios.interceptors.response.use(
  res => {
    switch (res.data.code) { //对响应数据做些事
      case 200:
        break;
      case 401:
        // 这里写清除token的代码
        // 没有权限
        break;
      default:
        ElMessage.error(res.data.message);
        break;
    }
    return res.data;
  },
  err => {
    //请求错误时做些事
    ElMessage.error(err);
    return Promise.reject(err);
  }
)

export default Axios
