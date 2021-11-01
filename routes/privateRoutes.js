const express = require("express");
const adminRouter = express.Router();

const privatesController = require("../controllers/privatesController");

adminRouter.get("/", privatesController.index);

adminRouter.get("/updateArticle/:slug", privatesController.editArticle);
adminRouter.post("/updateArticle/:slug", privatesController.updateArticle);

adminRouter.get("/createArticle", privatesController.createArticle);
adminRouter.post("/createArticle", privatesController.storeArticle);

adminRouter.post("/comment/:slug", privatesController.storeComment);

adminRouter.get("/deleteArticle/:slug", privatesController.destroyArticle);

module.exports = adminRouter;
