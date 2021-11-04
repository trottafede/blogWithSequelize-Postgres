const express = require("express");
const adminRouter = express.Router();

const privatesController = require("../controllers/privatesController");
const {
  canCreate,
  canComment,
  canUpdate,
  canDeleteArticles,
  canSeeAdmin,
  canDeleteUser,
} = require("../middlewares/Privileges");

adminRouter.get("/myProfile", privatesController.showProfile);

adminRouter.get("/", canSeeAdmin, privatesController.showAdmin);
adminRouter.get("/editor", canCreate, privatesController.showEditor);
adminRouter.get("/writer", canCreate, privatesController.showWriter);

adminRouter.get(
  "/updateArticle/:slug",
  canUpdate,
  privatesController.editArticle
);
adminRouter.post(
  "/updateArticle/:slug",
  canUpdate,
  privatesController.updateArticle
);

adminRouter.get("/createArticle", canCreate, privatesController.createArticle);
adminRouter.post("/createArticle", canCreate, privatesController.storeArticle);

adminRouter.post("/comment/:slug", canComment, privatesController.storeComment);

adminRouter.get("/delete/:id", canDeleteUser, privatesController.destroyUser);

adminRouter.get(
  "/deleteArticle/:slug",
  canDeleteArticles,
  privatesController.destroyArticle
);

module.exports = adminRouter;
