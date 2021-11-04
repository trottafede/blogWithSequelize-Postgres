const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/api/usersController");

router.get("/api/users", usersController.index);
router.post("/api/users", usersController.store);
router.patch("/api/users/:id", usersController.update);
router.delete("/api/users/:id", usersController.destroy);

module.exports = router;
