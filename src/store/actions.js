/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:43:50
 */
import { Message, MessageBox } from "element-ui";

import { ActionName, MutationName } from "./types";

import AdminApi from "src/api/admin";
import GuestApi from "src/api/blog";

export default {
  [ActionName.USER_LOGIN]({ commit }, user) {
    return new Promise((resolve, reject) => {
      AdminApi.postLogin(user).then(res => {
        if (200 == res.code) {
          commit(MutationName.SET_USER, {
            token: res.token,
            name: user.name
          });
          Message({
            message: res.message,
            type: "success"
          });
          window.location.href = "/admin.html";
        }
        resolve(res);
      });
    });
  },
  [ActionName.USER_LOGOUT]({ commit }) {
    MessageBox.confirm("是否退出登录？")
      .then(res => {
        commit(MutationName.CLEAR_USER);
        Message({
          message: "退出登录成功!",
          type: "success"
        });
        window.location.href = "/admin/login.html";
      })
      .catch(err => {});
  },
  [ActionName.MODIFY_PWD]({ commit }, data) {
    return new Promise((resolve, reject) => {
      AdminApi.putUserPassword(data).then(res => {
        if (200 == res.code) {
          commit(MutationName.CLEAR_USER);
          Message({
            message: res.message,
            type: "success"
          });
          window.location.href = "/admin/login.html";
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
  [ActionName.ADD_VIEW_TIME]({ state, commit }, article) {
    let { visitor } = state;
    if (!visitor.ids) {
      visitor.ids = [];
    }
    return new Promise((resolve, reject) => {
      if (!visitor.ids.includes(article.id)) {
        GuestApi.putArticleViewCount({
          id: article.id,
          viewCount: article.viewCount + 1
        })
        .then(res => {
          visitor.ids.push(article.id);
          commit(MutationName.SET_VISITOR, visitor);
          resolve({
            ...res,
            count: article.viewCount + 1
          });
        });
      }
    });
  }
};
