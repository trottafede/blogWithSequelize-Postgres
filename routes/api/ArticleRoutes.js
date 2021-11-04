const express = require("express");
const router = express.Router();

const articlesController = require("../../controllers/api/articlesController");

router.get("/api/articles", articlesController.index);
router.get("/api/articles/:slug", articlesController.show);
router.post("/api/articles/:slug", articlesController.store);
router.patch("/api/articles/:slug", articlesController.update);
router.delete("/api/articles/:slug", articlesController.destroy);

router.get("/api/articles/filters/:user", articlesController.findByUser);

module.exports = router;
