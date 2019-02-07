import Vue from "vue"
import VueResource from "vue-resource"

import store from "store";

import { MutationName } from "store/types";
import { Message } from "element-ui";

Vue.use(VueResource)

/*http options*/
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

/*http interceptor*/
const _jsonp = Vue.http.jsonp
Vue.http.jsonp = (url, params) => new Promise((resolve, reject) => _jsonp.call(Vue.http, url, {params}).then(res => resolve(res.body)).catch(reject))

Vue.http.interceptors.push((request, next) => {
    request.timeout = 60000
    const { token } = store.getters;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      request.headers.set('Authorization', token)
    }
    next(response => {
      //response.body
      switch (response.body.code) { //对响应数据做些事
        case -200:
          Message.error(response.body.message);
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
      return response
    })
})

export default VueResource