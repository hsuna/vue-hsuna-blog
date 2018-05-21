import Vue from 'vue';
/* 引用-element-ui */
import {
  Button,
  Dialog,
  Input,
  Loading,
  Menu,
  MenuItem,
  Tooltip,
  Pagination,
  Tag,
} from 'element-ui';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Tag);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$ELEMENT = { size: 'small' };

import "assets/styles/element-variables.scss";

export default Vue;
