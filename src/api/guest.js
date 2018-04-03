/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 13:45:01
 */

export default {
  //////// 分类模块 ////////
  getClassify: process.env.API_HOST + "classify", //查询分类
  getClassifyCount: process.env.API_HOST + "article/classifyCount", //查询分类数量

  //////// 文章模块 ////////
  getArticle: process.env.API_HOST + "article", //查询文章
  getArticleDetail: process.env.API_HOST + "article/detail", //查询文章详情
  getArticleRelate: process.env.API_HOST + "article/relate", //查询文章相关
  getArticleHot: process.env.API_HOST + "article/hot", //查询热门文章
  getArticleAchive: process.env.API_HOST + "article/achive", //查询文章归档

  getAchiveCount: process.env.API_HOST + "article/achiveCount", //查询文章归档
  putArticleViewCount: process.env.API_HOST + "article/viewCount", //更新浏览次数

  ////////// 评论模块 ////////
  postComment: process.env.API_HOST + "comment", //添加文章评论
  getCommentNew: process.env.API_HOST + "comment/new", //查询最新留言

  ////////// 文件模块 ////////
  getFileUpload: process.env.API_HOST + "file/upload" //获取文件
};
