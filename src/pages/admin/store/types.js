/*
 * @Description store-type
 * @Author: Hsuan
 * @Date: 2018-03-30 14:48:04
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:44:50
 */

/**
 * MutationName-commit
 */
const MutationName = {
  SET_USER: "setUser", //记录登录用户
  CLEAR_USER: "clearUser", //清除登录用户
  SET_ARTICLE: "setArticle", //记录缓存文章
  CLEAR_ARTICLE: "clearArticle", //清除缓存文章
  SET_TAGS: "setTags", //记录标签信息
};

/**
 * ActionName-dispatch
 */
const ActionName = {
  USER_LOGIN: "userLogin", //用户登录
  USER_LOGOUT: "userLogout", //用户登出
  MODIFY_PWD: "modifyPassword", //修改密码
  ADD_ARTICLE_TAGS: "addArticleTags", //添加文章标签
};

export { MutationName, ActionName };
