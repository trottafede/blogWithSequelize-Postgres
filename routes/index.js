const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/admin", privateRoutes);
  app.use(publicRoutes);
};
