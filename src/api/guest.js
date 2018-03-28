/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-28 13:40:57
 */


export default {
  //////// 分类模块 ////////
  getClassify: process.env.API_HOST + "classify",  //查询分类
  getClassifyCount: process.env.API_HOST + "article/classifyCount",//查询分类数量
  
  //////// 文章模块 ////////
  getArticle: process.env.API_HOST + "article",//查询文章
  getArticleDetail: process.env.API_HOST + "article/detail",//查询文章
};
