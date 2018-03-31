/*
 * @Description store-type
 * @Author: Hsuan
 * @Date: 2018-03-30 14:48:04
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-31 19:55:01
 */

/**
 * MutationName-commit
 */
const MutationName = {
  SET_USER: "setUser", //记录登录用户
  CLEAR_USER: "clearUser", //清除登录用户
  SET_ARTICLE: "setArticle", //记录缓存文章
  CLEAR_ARTICLE: "clearArticle", //清除缓存文章
  SET_VISITOR: "setVisitor", //访客者信息
  SET_COMMENT_USER: "setCommentUser", //记录评论用户信息
  CLEAR_COMMENT_USER: "clearCommentUser" //清除评论用户信息
};

/**
 * ActionName-dispatch
 */
const ActionName = {
  USER_LOGIN: "userLogin", //用户登录
  USER_LOGOUT: "userLogout", //用户登出
  ADD_VIEW_TIME: "addViewTime" //添加浏览次数
};

export { MutationName, ActionName };
