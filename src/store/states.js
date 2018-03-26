/*
 * @Description: 状态
 * @Author: Hsuna
 * @Date: 2018-03-25 00:42:43
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-26 22:08:23
 */

export default {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  article: JSON.parse(localStorage.getItem("article") || "{}")
};
