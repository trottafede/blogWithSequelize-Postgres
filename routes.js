const articlesController = require("./controllers/articlesController");
const authorsController = require("./controllers/authorsController");
const pagesController = require("./controllers/pagesController");
const commentsController = require("./controllers/commentsController");

const express = require("express");
const router = express.Router();

router.get("/", articlesController.index);

router.get("/articulo/:slug", articlesController.show);
router.get("/admin", articlesController.AdminPage);

router.get("/admin/updateArticle/:slug", articlesController.edit);
router.post("/admin/updateArticle/:slug", articlesController.update);

router.get("/admin/createAuthor", authorsController.render);
router.post("/admin/createAuthor", authorsController.store);

router.get("/admin/createArticle", articlesController.render);
router.post("/admin/createArticle", articlesController.store);

router.get("/admin/deleteArticle/:slug", articlesController.destroy);

router.get("/api/articulos", pagesController.ApiArticles);

router.post("/comment/:slug", commentsController.store);

router.get("*", pagesController.NotFoundPage);

module.exports = router;
