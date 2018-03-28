/*
 * @Description: 状态管理器
 * @Author: Hsuna
 * @Date: 2018-03-25 00:43:11
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-29 02:55:39
 */

import Vue from "vue";
import Vuex from "vuex";

import state from "./states";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
