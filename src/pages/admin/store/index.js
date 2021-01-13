/*
 * @Description: 状态管理器
 * @Author: Hsuna
 * @Date: 2018-03-25 00:43:11
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-30 11:45:36
 */

import { createStore } from 'vuex'

import state from "./states";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
