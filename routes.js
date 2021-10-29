const articlesController = require("./controllers/articlesController");
const authorsController = require("./controllers/authorsController");
const pagesController = require("./controllers/pagesController");
const commentsController = require("./controllers/commentsController");

const express = require("express");
const router = express.Router();

router.get("/", articlesController.index);

router.get("/articulo/:id", articlesController.show);
router.get("/admin", articlesController.AdminPage);

router.get("/admin/updateArticle/:id", articlesController.edit);
router.post("/admin/updateArticle/:id", articlesController.update);

router.get("/admin/createAuthor", authorsController.render);
router.post("/admin/createAuthor", authorsController.store);

router.get("/admin/createArticle", articlesController.render);
router.post("/admin/createArticle", articlesController.store);

router.get("/admin/deleteArticle/:id", articlesController.destroy);

router.get("/api/articulos", pagesController.ApiArticles);

router.post("/comment/:articleId", commentsController.store);

router.get("*", pagesController.NotFoundPage);

module.exports = router;
