/*
 * @Description 前台-分类-api
 * @Author: Hsuan
 * @Date: 2018-03-26 14:42:22
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-27 16:35:05
 */


export default {
  //////// 分类模块 ////////
  getClassify: process.env.API_HOST + "classify",  //查询分类
  
  //////// 文章模块 ////////
  getArticle: process.env.API_HOST + "article",//查询文章
  getClassifyCount: process.env.API_HOST + "article/classifyCount",//查询文章
};
