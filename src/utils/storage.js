/**
 * 浏览器storage缓存的key
 */
const StorageKey = {
  TOKEN: "HSUNA_ADMIN_TOKEN", //用户信息
  VISITOR: "HSUNA_BLOG_VISITOR", //访客者信息
};

const storage = {
  get(key, defVal = "{}") {
    return JSON.parse(localStorage.getItem(key) || defVal);
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export { 
  StorageKey 
}

export default storage;
