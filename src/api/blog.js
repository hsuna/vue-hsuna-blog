/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuna
 * @Last Modified time: 2021-05-12 00:01:03
 */
import Axios from './axios'

export default {
  //////// 用户模块 ////////
  getUserInfo: d => Axios.get("user/user/info", d), //获取用户信息

  //////// 分类模块 ////////
  getClassify: d => Axios.get("classify", d), //查询分类
  getClassifyCount: d => Axios.get("article/classifyCount", d), //查询分类数量

  //////// 文章模块 ////////
  getArticle: d => Axios.get("article", d), //查询文章
  getArticleDetail: d => Axios.get("article/detail", d), //查询文章详情
  getArticleRelate: d => Axios.get("article/relate", d), //查询文章相关
  getArticleHot: d => Axios.get("article/hot", d), //查询热门文章
  getArticleAchive: d => Axios.get("article/achive", d), //查询文章归档

  getAchiveCount: d => Axios.get("article/achiveCount", d), //查询文章归档
  putArticleViewCount: d => Axios.put("article/viewCount", d), //更新浏览次数

  ////////// 评论模块 ////////
  postComment: d => Axios.post("comment", d), //添加文章评论
  getCommentNew: d => Axios.get("comment/new", d), //查询最新留言

  /////// 手札模块 ////////
  getEssay: d => Axios.get("essay", d), //查询随记
  getInventory: d => Axios.get("inventory", d), //查询随记
  getLink: d => Axios.get("link", d), //查询随记
};
