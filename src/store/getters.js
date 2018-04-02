/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-30 15:00:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 20:39:32
 */
import states from "./states";

export default {
  token: state => state.user.token,
  isLogin: state => Boolean(state.user.token),
  userName: state => state.user.name,
  commentUser: state => state.visitor.comment || {},
  tagList: state => state.tags.map(value => ({ tag: value }))
};
