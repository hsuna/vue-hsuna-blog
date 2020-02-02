/*
 * @Description admin模块-api
 * @Author: Hsuan
 * @Date: 2018-03-17 10:14:48
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-26 00:27:50
 */
import Axios from './axios'

export default {

  //////// 登录模块 ////////

  postLogin: d => Axios.post('admin/login', d), //登录

  //////// 用户模块 ////////
  putUserPassword: d => Axios.put("admin/user/password", d), // 更新用户密码
  getUserInfo: d => Axios.get("admin/user/userInfo", d),     // 获取用户信息
  putUserInfo: d => Axios.put("admin/user/userInfo", d),     // 更新用户信息
  postUserUpload: () => Axios.defaults.baseURL + "admin/user/upload",   // 更新用户图片

  //////// 分类模块 ////////
  getClassify: d => Axios.get("admin/classify", d), //查询分类
  postClassify: d => Axios.post("admin/classify", d), //添加分类
  putClassify: d => Axios.put("admin/classify", d), //更新分类
  deleteClassify: d => Axios.delete("admin/classify", d), //删除分类

  //////// 文章模块 ////////
  getArticle: d => Axios.get("admin/article", d), //查询文章
  postArticle: d => Axios.post("admin/article", d), //添加文章
  putArticle: d => Axios.put("admin/article", d), //更新文章
  deleteArticle: d => Axios.delete("admin/article", d), //删除文章

  ////////// 评论模块 ////////
  postComment: d => Axios.post("admin/comment", d), //添加文章评论
  deleteComment: d => Axios.delete("admin/comment", d), //删除文章评论

  /////// 文件模块 ////////
  postFileUpload: () => Axios.defaults.baseURL + "admin/file/upload", //上传文件
  deleteFileUpload: d => Axios.delete("admin/file/upload", d), //删除文件

  /////// 手札模块 ////////
  getEssay: d => Axios.get("admin/essay", d), //查询随记
  postEssay: d => Axios.post("admin/essay", d), //添加随记
  deleteEssay: d => Axios.delete("admin/essay", d), //删除随记

  getInventory: d => Axios.get("admin/inventory", d), //查询随记
  postInventory: d => Axios.post("admin/inventory", d), //添加随记
  deleteInventory: d => Axios.delete("admin/inventory", d), //删除随记

  getLink: d => Axios.get("admin/link", d), //查询随记
  postLink: d => Axios.post("admin/link", d), //添加随记
  deleteLink: d => Axios.delete("admin/link", d), //删除随记

  //////// model ////////
}
