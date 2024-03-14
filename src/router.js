/*
 * @Description
 * @Author: Hsuan
 * @Date: 2018-03-17 10:13:19
 * @Last Modified by: Hsuna
 * @Last Modified time: 2021-05-05 12:54:47
 */
import { createRouter, createWebHistory } from "vue-router";
import { setDocumentTitle } from "src/utils/title";

const routes = [
  /////////////////后台路由////////////////
  {
    path: "/",
    component: () => import('src/pages/home/index.vue'),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/archive",
    component: () => import('src/pages/archive/index.vue'),
    meta: {
      title: "归档",
    },
  },
  {
    path: "/essay",
    component: () => import('src/pages/essay/index.vue'),
    meta: {
      title: "手札",
    },
  },
  {
    path: "/about",
    component: () => import('src/pages/about/index.vue'),
    meta: {
      title: "关于我",
    },
  },
  {
    path: "/article/:id",
    component: () => import('src/pages/article/index.vue'),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/404",
    component: () => import('src/pages/404/index.vue'),
    meta: {
      title: "404",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior: () => ({ y: 0 }),
  routes
});

// 路由钩子
router.beforeEach(async (to, from, next) => {
  // set page title
  setDocumentTitle(`${to.meta?.title || "博客"} | HSUAN`);
  next();
});

export default router;
