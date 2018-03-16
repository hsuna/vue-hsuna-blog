import Axios from "axios";
import qs from "qs";

Axios.defaults.baseURL = "https://api.example.com";
Axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//添加请求拦截器
Axios.interceptors.request.use(
  cfg => {
    //在发送请求之前做某事
    return cfg;
  },
  err => {
    //请求错误时做些事
    return Promise.reject(err);
  }
);

//添加响应拦截器
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    return res;
  },
  err => {
    //请求错误时做些事
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          });
      }
    }
    return Promise.reject(err.response.data);
  }
);
