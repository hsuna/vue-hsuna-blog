/* jshint esversion: 6 */
/*
 * @Description admin模块-api
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:48
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-25 12:22:05
 */

export default {
  //////// 登录模块 ////////
  postLogin: process.env.API_HOST + "admin/login",

  //////// 分类模块 ////////
  getClassifyAll: process.env.API_HOST + "admin/classify/all",  //查看所有分类
  postClassify: process.env.API_HOST + "admin/classify",  //添加分类
  putClassify: process.env.API_HOST + "admin/classify",  //更新分类
  deleteClassify: process.env.API_HOST + "admin/classify",  //删除分类

  //////// 文章模块 ////////
  getArticleAll: process.env.API_HOST + "admin/article/all",

  //////// model ////////
};
