/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuna
 * @Last Modified time: 2021-05-23 23:07:41
 */
import Axios from "./axios";

export default {
  //////// 用户模块 ////////
  getUserInfo: (d) => Axios.get("blog/user/info", d), //获取用户信息

  //////// 分类模块 ////////
  getClassify: (d) => Axios.get("blog/classify", d), //查询分类
  getClassifyCount: (d) => Axios.get("blog/article/classifyCount", d), //查询分类数量

  //////// 文章模块 ////////
  getArticle: (d) => Axios.get("blog/article", d), //查询文章
  getArticleDetail: (d) => Axios.get("blog/article/detail", d), //查询文章详情
  getArticleRelate: (d) => Axios.get("blog/article/relate", d), //查询文章相关
  getArticleHot: (d) => Axios.get("blog/article/hot", d), //查询热门文章
  getArticleAchive: (d) => Axios.get("blog/article/achive", d), //查询文章归档

  getAchiveCount: (d) => Axios.get("blog/article/achiveCount", d), //查询文章归档
  putArticleViewCount: (d) => Axios.put("blog/article/viewCount", d), //更新浏览次数

  ////////// 评论模块 ////////
  postComment: (d) => Axios.post("blog/comment", d), //添加文章评论
  getCommentNew: (d) => Axios.get("blog/comment/new", d), //查询最新留言

  /////// 手札模块 ////////
  getEssay: (d) => Axios.get("blog/essay", d), //查询随记
  getInventory: (d) => Axios.get("blog/inventory", d), //查询随记
  getLink: (d) => Axios.get("blog/link", d), //查询随记
};
