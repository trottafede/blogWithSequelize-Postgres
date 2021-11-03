const express = require("express");
const adminRouter = express.Router();

const privatesController = require("../controllers/privatesController");
const {
  canCreate,
  canComment,
  canUpdate,
  canDelete,
  canSeeAdmin,
} = require("../middlewares/Privileges");

// ----------------------Admin
//-------------------------Editor
// -----------------------Writer
// ---------------------Lector

adminRouter.get("/myProfile", privatesController.showProfile);

adminRouter.get("/", canSeeAdmin, privatesController.showAdmin);
adminRouter.get("/editor", canCreate, privatesController.showEditor);
adminRouter.get("/writer", canCreate, privatesController.showWriter);
adminRouter.get("/lector", canComment, privatesController.showLector);

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

adminRouter.get("/delete/:id", canDelete, privatesController.destroyUser);

adminRouter.get(
  "/deleteArticle/:slug",
  canDelete,
  privatesController.destroyArticle
);

module.exports = adminRouter;
