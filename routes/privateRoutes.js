const express = require("express");
const adminRouter = express.Router();

const privatesController = require("../controllers/privatesController");
const {
  canCreateArticles,
  canComment,
  canUpdateOwnArticles,
  canUpdateArticles,

  canDeleteArticles,
  canSeeAdmin,
  canDeleteUser,
} = require("../middlewares/Privileges");

adminRouter.get("/myProfile", privatesController.showProfile);

adminRouter.get("/", canSeeAdmin, privatesController.showAdmin);
adminRouter.get("/editor", canCreateArticles, privatesController.showEditor);
adminRouter.get("/writer", canCreateArticles, privatesController.showWriter);

adminRouter.get(
  "/updateArticle/:slug",
  [canUpdateOwnArticles, canUpdateArticles],
  privatesController.editArticle
);
adminRouter.post(
  "/updateArticle/:slug",
  [canUpdateOwnArticles, canUpdateArticles],
  privatesController.updateArticle
);

adminRouter.get(
  "/createArticle",
  canCreateArticles,
  privatesController.createArticle
);
adminRouter.post(
  "/createArticle",
  canCreateArticles,
  privatesController.storeArticle
);

adminRouter.post("/comment/:slug", canComment, privatesController.storeComment);

adminRouter.get("/delete/:id", canDeleteUser, privatesController.destroyUser);

adminRouter.get(
  "/deleteArticle/:slug",
  canDeleteArticles,
  privatesController.destroyArticle
);

module.exports = adminRouter;
