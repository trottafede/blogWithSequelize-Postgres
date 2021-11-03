const express = require("express");
const publicRouter = express.Router();
const publicsController = require("../controllers/publicsController");

publicRouter.get("/", publicsController.index);

publicRouter.get("/generate", publicsController.generateArticles);

publicRouter.get("/article/:slug", publicsController.show);
publicRouter.get("/api/articles", publicsController.ApiArticles);

publicRouter.get("*", publicsController.NotFoundPage);

module.exports = publicRouter;
