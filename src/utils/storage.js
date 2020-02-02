/**
 * 浏览器storage缓存的key
 */
const StorageKey = {
  USER: "HSUNA_BLOG_USER", //用户信息
  ARTICLE: "HSUNA_BLOG_ARTICLE", //文章缓存
  VISITOR: "HSUNA_BLOG_VISITOR", //访客者信息
  TAGS: "HSUNA_BLOG_TAGS" //标签列表
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
