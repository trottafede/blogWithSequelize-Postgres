const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const isAuthenticated = require("../middlewares/isAuthenticated");
module.exports = (app) => {
  app.use("/admin", isAuthenticated, privateRoutes);
  app.use(publicRoutes);
};
