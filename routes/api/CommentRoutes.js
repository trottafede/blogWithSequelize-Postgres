const express = require("express");
const router = express.Router();

const {
  canComment,
  canDeleteComments,
  canPatchComments,
} = require("../../middlewares/Privileges");

const commentsController = require("../../controllers/api/commentsController");

router.get("/api/comments", commentsController.index);
router.post("/api/comments/:slug", canComment, commentsController.store);
router.patch(
  "/api/comments/:commentId",
  canPatchComments,
  commentsController.update
);
router.delete(
  "/api/comments/:id",
  canDeleteComments,
  commentsController.destroy
);

module.exports = router;
