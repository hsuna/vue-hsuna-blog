/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:37
 */

const API_HOST = process.env.API_HOST

export default {
  //////// 用户模块 ////////
  getUserInfo: API_HOST + "user/userInfo", //获取用户信息

  //////// 分类模块 ////////
  getClassify: API_HOST + "classify", //查询分类
  getClassifyCount: API_HOST + "article/classifyCount", //查询分类数量

  //////// 文章模块 ////////
  getArticle: API_HOST + "article", //查询文章
  getArticleDetail: API_HOST + "article/detail", //查询文章详情
  getArticleRelate: API_HOST + "article/relate", //查询文章相关
  getArticleHot: API_HOST + "article/hot", //查询热门文章
  getArticleAchive: API_HOST + "article/achive", //查询文章归档

  getAchiveCount: API_HOST + "article/achiveCount", //查询文章归档
  putArticleViewCount: API_HOST + "article/viewCount", //更新浏览次数

  ////////// 评论模块 ////////
  postComment: API_HOST + "comment", //添加文章评论
  getCommentNew: API_HOST + "comment/new", //查询最新留言

  /////// 手札模块 ////////
  getEssay: API_HOST + "essay", //查询随记
  getInventory: API_HOST + "inventory", //查询随记
  getLink: API_HOST + "link", //查询随记
};
