/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-03-26 01:48:38
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:43:50
 */
import { ActionName, MutationName } from "./types";

import $admin from "api/admin";
import $guest from "api/guest";

export default {
  [ActionName.USER_LOGIN]({ commit }, { user, vm }) {
    if (vm) {
      return new Promise((resolve, reject) => {
        vm.$http.post($admin.postLogin, user).then(res => {
          if (200 == res.code) {
            commit(MutationName.SET_USER, {
              token: res.token,
              name: user.name
            });
            vm.$message({
              message: res.message,
              type: "success"
            });
            vm.$router.replace({ path: "/admin" });
          }
          resolve(res);
        });
      });
    }
  },
  [ActionName.USER_LOGOUT]({ commit }, { vm }) {
    if (vm) {
      vm
        .$confirm("是否退出登录？")
        .then(res => {
          commit(MutationName.CLEAR_USER);
          vm.$message({
            message: "退出登录成功!",
            type: "success"
          });
          vm.$router.replace({ path: "/login" });
        })
        .catch(err => {});
    }
  },
  [ActionName.MODIFY_PWD]({ commit }, { data, vm }) {
    if (vm) {
      return new Promise((resolve, reject) => {
        vm.$http.put($admin.putUserPassword, data).then(res => {
          if (200 == res.code) {
            commit(MutationName.CLEAR_USER);
            vm.$message({
              message: res.message,
              type: "success"
            });
            vm.$router.replace({ path: "/login" });
          }
          resolve(res);
        });
      });
    }
  },
  [ActionName.ADD_ARTICLE_TAGS]({ state, commit }, addTags) {
    let { tags } = state;
    tags = Array.from(new Set([...tags, ...addTags]));
    commit(MutationName.SET_TAGS, tags);
  },
  [ActionName.ADD_VIEW_TIME]({ state, commit }, { article, vm }) {
    let { visitor } = state;
    if (!visitor.ids) {
      visitor.ids = [];
    }
    return new Promise((resolve, reject) => {
      if (!visitor.ids.includes(article.id)) {
        if (vm) {
          vm.$http
            .put($guest.putArticleViewCount, {
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
      }
    });
  }
};
