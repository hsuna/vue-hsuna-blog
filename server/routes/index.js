const routes = app => {
  app.use("/user", require("user"));
  app.use("/category", require("category"));
  app.use("/article", require("article"));
}

export default routes;
