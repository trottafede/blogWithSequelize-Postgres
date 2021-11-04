const ArticleRoutes = require("./ArticleRoutes");
const CommentRoutes = require("./CommentRoutes");
const UserRoutes = require("./UserRoutes");
const check = require("../../middlewares/checkJwT");

module.exports = (app) => {
  app.use(check, ArticleRoutes);
  app.use(check, CommentRoutes);
  app.use(check, UserRoutes);
};
