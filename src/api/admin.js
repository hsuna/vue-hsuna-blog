/*
 * @Description admin模块-api
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:48
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:50
 */

export default {

  //////// 登录模块 ////////
  postLogin: process.env.API_HOST + "admin/login", //登录

  //////// 用户模块 ////////
  putUserPassword: process.env.API_HOST + "admin/user/password", //更新用户密码
  getUserInfo: process.env.API_HOST + "admin/user/userInfo", //获取用户信息
  putUserInfo: process.env.API_HOST + "admin/user/userInfo", //更新用户信息
  postUserPortrait: process.env.API_HOST + "admin/user/portrait", //更新用户头像
  postUserBanner: process.env.API_HOST + "admin/user/banner", //更新用户背景图

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
  deleteFileUpload: process.env.API_HOST + "admin/file/upload", //删除文件

  /////// 手札模块 ////////
  getEssay: process.env.API_HOST + "admin/essay", //查询随记
  postEssay: process.env.API_HOST + "admin/essay", //添加随记
  deleteEssay: process.env.API_HOST + "admin/essay", //删除随记

  getInventory: process.env.API_HOST + "admin/inventory", //查询随记
  postInventory: process.env.API_HOST + "admin/inventory", //添加随记
  deleteInventory: process.env.API_HOST + "admin/inventory", //删除随记

  getLink: process.env.API_HOST + "admin/link", //查询随记
  postLink: process.env.API_HOST + "admin/link", //添加随记
  deleteLink: process.env.API_HOST + "admin/link" //删除随记

  //////// model ////////
};
