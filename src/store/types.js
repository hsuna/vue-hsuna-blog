/*
 * @Description store-type
 * @Author: Hsuan 
 * @Date: 2018-03-30 14:48:04 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-30 17:02:31
 */

/**
 * 状态管理-方法名
 */
const ActionKey = {
  USER_LOGIN: 'userLogin', //用户登录
  USER_LOGOUT: 'userLogout', //用户登出
  RECORD_ARTICLE: 'recordArticle', //记录缓存文章
  CLEAR_ARTICLE: 'clearArticle', //清除缓存文章
  RECORD_COMMENT_USER: 'recordCommentUser', //记录评论用户信息
  CLEAR_COMMENT_USER: 'clearCommentUser', //清除评论用户信息
  ADD_BROWES_TIME: 'addBrowesTime' //添加浏览次数
}

/**
 * 浏览器storage缓存的key
 */
const StorageKey = {
  USER: 'HSUNA_BLOG_USER', //用户信息
  ARTICLE: 'HSUNA_BLOG_ARTICLE', //文章缓存
  BROWES_TIME: 'HSUNA_BLOG_BROWES_TIME', //浏览记录
  COMMENT_USER: 'HSUNA_BLOG_COMMENT_USER', //评论用户
}

export {
  ActionKey,
  StorageKey
};
