import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import routes from "./routes";
const router = new VueRouter({
  mode: "history",
  routes
});

// 路由钩子
router.beforeEach((to, from, next) => {
  next();
});

export default router;
