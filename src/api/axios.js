/*
 * @Description axios拦截器自定义
 * @Author: Hsuan
 * @Date: 2018-03-17 10:09:18
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-20 10:27:42
 */
import Axios from "axios"

import { ElMessage } from "element-plus";

import storage, { StorageKey } from 'src/utils/storage.js'

Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '//api.hsuna.com/blog/' : `//${location.host}/api/blog/`
Axios.defaults.timeout = 600000000;
Axios.defaults.withCredentials = true;
Axios.header = {
  "Content-Type": "application/x-www-form-urlencoded"
};

//添加请求拦截器
Axios.interceptors.request.use(
  config => {
    let { token } = storage.get(StorageKey.USER);
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
        storage.remove(StorageKey.USER);
        /* router.replace({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
        }); */
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
