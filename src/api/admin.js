/*
 * @Description admin模块-api
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:48
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:50
 */

const API_HOST = process.env.API_HOST

export default {

  //////// 登录模块 ////////
  postLogin: API_HOST + "admin/login", //登录

  //////// 用户模块 ////////
  putUserPassword: API_HOST + "admin/user/password", //更新用户密码
  getUserInfo: API_HOST + "admin/user/userInfo", //获取用户信息
  putUserInfo: API_HOST + "admin/user/userInfo", //更新用户信息
  postUserUpload: API_HOST + "admin/user/upload", //更新用户图片

  //////// 分类模块 ////////
  getClassify: API_HOST + "admin/classify", //查询分类
  postClassify: API_HOST + "admin/classify", //添加分类
  putClassify: API_HOST + "admin/classify", //更新分类
  deleteClassify: API_HOST + "admin/classify", //删除分类

  //////// 文章模块 ////////
  getArticle: API_HOST + "admin/article", //查询文章
  postArticle: API_HOST + "admin/article", //添加文章
  putArticle: API_HOST + "admin/article", //更新文章
  deleteArticle: API_HOST + "admin/article", //删除文章

  ////////// 评论模块 ////////
  postComment: API_HOST + "admin/comment", //添加文章评论
  deleteComment: API_HOST + "admin/comment", //删除文章评论

  /////// 文件模块 ////////
  postFileUpload: API_HOST + "admin/file/upload", //上传文件
  deleteFileUpload: API_HOST + "admin/file/upload", //删除文件

  /////// 手札模块 ////////
  getEssay: API_HOST + "admin/essay", //查询随记
  postEssay: API_HOST + "admin/essay", //添加随记
  deleteEssay: API_HOST + "admin/essay", //删除随记

  getInventory: API_HOST + "admin/inventory", //查询随记
  postInventory: API_HOST + "admin/inventory", //添加随记
  deleteInventory: API_HOST + "admin/inventory", //删除随记

  getLink: API_HOST + "admin/link", //查询随记
  postLink: API_HOST + "admin/link", //添加随记
  deleteLink: API_HOST + "admin/link" //删除随记

  //////// model ////////
}
