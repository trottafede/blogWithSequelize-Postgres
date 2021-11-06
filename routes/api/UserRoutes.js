const express = require("express");
const router = express.Router();
const {
  canDeleteUsers,
  canPatchUsers,
  canCreateUsers,
  canReadUsers,
} = require("../../middlewares/Privileges");

const usersController = require("../../controllers/api/usersController");

router.get("/api/users", canReadUsers, usersController.index);
router.post("/api/users", canCreateUsers, usersController.store);
router.patch("/api/users/:id", canPatchUsers, usersController.update);
router.delete("/api/users/:id", canDeleteUsers, usersController.destroy);

module.exports = router;
