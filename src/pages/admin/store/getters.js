/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-30 15:00:53
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-04 02:20:10
 */
export default {
  token: state => state.user.token,
  isLogin: state => Boolean(state.user.token),
  userName: state => state.user.name,
  userEmail: state => state.user.email,
  tagList: state => state.tags.map(value => ({ tag: value }))
};
