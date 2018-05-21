/*
 * @Description 路径处理器
 * @Author: Hsuan
 * @Date: 2018-03-17 10:17:16
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-05-20 17:16:50
 */


const goUrl = options => {
  let url = '';
  if ('string' == typeof options) {
    url = options;
  } else {
    if (options.query) {
      url = "?" + Object.keys(options.query).map(name => name + '=' + options.query[name]).join('&');
    }
    url = options.path + url;
  }
  if (options.replace) {
    window.location.replace(url);
  } else {
    window.location.href = url;
  }
}

const getUrlQuery = name => {
  if (name) {
    let reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  } else {
    let map = {};
    let m = window.location.search.match(/(\\?|&)([^&]*)=([^&]*)(&|$)/g);
    if (m) {
      m.forEach(str => {
        let data = /(\\?|&)([^&]*)=([^&]*)(&|$)/.exec(str);
        map[data[1]] = data[2];
      });
    }
    return map;
  }
}

export default {
  goUrl,
  getUrlQuery
};
