/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:43:50
 */
import { ElMessage, ElMessageBox } from "element-plus";

import { ActionName, MutationName } from "./types";

import Api from "src/api/admin";

export default {
  [ActionName.USER_LOGIN]({ commit }, user) {
    return new Promise((resolve, reject) => {
      Api.postLogin(user).then(res => {
        if (200 == res.code) {
          ElMessage.success('恭喜，登录成功');
          commit(MutationName.SET_USER, {
            token: res.data.token,
            name: user.name
          });
          window.location.href = "/admin.html";
        }
        resolve(res);
      });
    });
  },
  [ActionName.USER_LOGOUT]({ commit }) {
    ElMessageBox.confirm("是否退出登录？").then(res => {
      ElMessage.success('退出登录成功');
        commit(MutationName.CLEAR_USER);
        window.location.reload()
      })
      .catch(err => {});
  },
  [ActionName.MODIFY_PWD]({ commit }, data) {
    return new Promise((resolve, reject) => {
      Api.putUserPassword(data).then(res => {
        if (200 == res.code) {
          ElMessage.success('修改密码成功，请重新登录！');
          commit(MutationName.CLEAR_USER);
          window.location.reload()
        }
        resolve(res);
      });
    });
  },
  [ActionName.ADD_ARTICLE_TAGS]({ state, commit }, addTags) {
    let { tags } = state;
    tags = Array.from(new Set([...tags, ...addTags]));
    commit(MutationName.SET_TAGS, tags);
  },
};
