/*
 * @Description admin模块-api
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:48
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-04 02:36:50
 */

export default {
  //////// 登录模块 ////////
  postLogin: process.env.API_HOST + "admin/login",

  //////// 分类模块 ////////
  getClassify: process.env.API_HOST + "admin/classify", //查询分类
  postClassify: process.env.API_HOST + "admin/classify", //添加分类
  putClassify: process.env.API_HOST + "admin/classify", //更新分类
  deleteClassify: process.env.API_HOST + "admin/classify", //删除分类

  //////// 文章模块 ////////
  getArticle: process.env.API_HOST + "admin/article", //查询文章
  postArticle: process.env.API_HOST + "admin/article", //添加文章
  putArticle: process.env.API_HOST + "admin/article", //更新文章
  deleteArticle: process.env.API_HOST + "admin/article", //删除文章

  ////////// 评论模块 ////////
  postComment: process.env.API_HOST + "admin/comment", //添加文章评论
  deleteComment: process.env.API_HOST + "admin/comment", //删除文章评论

  /////// 文件模块 ////////
  getFileUpload: process.env.API_HOST + "file/upload", //获取文件
  postFileUpload: process.env.API_HOST + "admin/file/upload", //上传文件
  deleteFileUpload: process.env.API_HOST + "admin/file/upload" //删除文件

  //////// model ////////
};
