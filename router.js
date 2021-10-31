const express = require("express");
const router = express.Router();

const publicsController = require("./controllers/publicsController");
const privatesController = require("./controllers/privatesController");

router.get("/", publicsController.indexHome);
router.get("/signup", publicsController.createUser);
router.post("/signup", publicsController.storeUser);
router.get("/login", publicsController.createLogIn);
router.post("/login", publicsController.storeLogIn);
router.get("/logOut", publicsController.logOut);
router.get("/article/:slug", publicsController.show);
router.post("/comment/:slug", publicsController.storeComment);
router.get("/api/articles", publicsController.ApiArticles);

router.get("/admin", privatesController.indexAdmin);
router.get("/admin/updateArticle/:slug", privatesController.editArticle);
router.post("/admin/updateArticle/:slug", privatesController.updateArticle);
router.get("/admin/createArticle", privatesController.createArticle);
router.post("/admin/createArticle", privatesController.storeArticle);
router.get("/admin/deleteArticle/:slug", privatesController.destroyArticle);

router.get("*", publicsController.NotFoundPage);

module.exports = router;
