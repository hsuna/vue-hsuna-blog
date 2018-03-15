export default [
  {
    path: "/login",
    component: resolve => require(["views/backend/Login.vue"], resolve)
  },
  {
    path: "/reg",
    component: resolve => require(["views/backend/Reg.vue"], resolve)
  },
  {
    path: "/admin",
    component: resolve => require(["views/backend/Admin.vue"], resolve)
  }
];
