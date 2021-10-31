const express = require("express");
const publicRouter = express.Router();
const publicsController = require("../controllers/publicsController");

publicRouter.get("/", publicsController.index);

publicRouter.get("/signup", publicsController.createUser);
publicRouter.post("/signup", publicsController.storeUser);

publicRouter.get("/login", publicsController.createLogIn);
publicRouter.post("/login", publicsController.storeLogIn);

publicRouter.get("/logOut", publicsController.logOut);

publicRouter.get("/article/:slug", publicsController.show);
publicRouter.post("/comment/:slug", publicsController.storeComment);
publicRouter.get("/api/articles", publicsController.ApiArticles);

publicRouter.get("*", publicsController.NotFoundPage);

module.exports = publicRouter;
