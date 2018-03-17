/* jshint esversion: 6 */
/*
 * @Description 
 * @Author: Hsuan 
 * @Date: 2018-03-17 10:14:33 
 * @Last Modified by:   Hsuan 
 * @Last Modified time: 2018-03-17 10:14:33 
 */

export default [
  {
    path: "/login",
    component: resolve => require(["views/backend/Login.vue"], resolve)
  },
  {
    path: "/reg",
    component: resolve => require(["views/backend/Reg.vue"], resolve)
  },
  {
    path: "/admin",
    component: resolve => require(["views/backend/Admin.vue"], resolve)
  }
];
