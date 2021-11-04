const isAuthenticated = require("../middlewares/isAuthenticated");
const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const authRoutes = require("./authRoutes");
const api = require("./api");

module.exports = (app) => {
  app.use(authRoutes);

  app.use("/admin", isAuthenticated, privateRoutes);

  app.use(publicRoutes);

  api(app);
};
