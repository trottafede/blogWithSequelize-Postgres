const express = require("express");
const router = express.Router();

const commentsController = require("../../controllers/api/commentsController");

router.get("/api/comments", commentsController.index);
router.post("/api/comments/:slug", commentsController.store);
router.patch("/api/comments/:commentId", commentsController.update);
router.delete("/api/comments/:id", commentsController.destroy);

module.exports = router;
