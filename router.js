const express = require("express");
const publicRouter = express.Router();

const publicsController = require("./controllers/publicsController");
publicRouter.get("/", publicsController.index);

module.exports = publicRouter;
