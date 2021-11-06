const express = require("express");
const router = express.Router();
const {
  canDeleteArticles,
  canUpdateOwnArticles,
  canDeleteOwnArticles,
  canCreateArticles,
  canUpdateArticles,
} = require("../../middlewares/Privileges");
const articlesController = require("../../controllers/api/articlesController");

router.get("/api/articles", articlesController.index);
router.get("/api/articles/:slug", canCreateArticles, articlesController.show);
router.post("/api/articles/:slug", canCreateArticles, articlesController.store);
router.patch(
  "/api/articles/:slug",
  [canUpdateOwnArticles, canUpdateArticles],
  articlesController.update
);
router.delete(
  "/api/articles/:slug",
  [canDeleteOwnArticles, canDeleteArticles],
  articlesController.destroy
);

router.get("/api/articles/filters/:user", articlesController.findByUser);

module.exports = router;
