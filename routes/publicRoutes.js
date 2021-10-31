const express = require("express");
const publicRouter = express.Router();
const publicsController = require("../controllers/publicsController");

publicRouter.get("/", publicsController.index);

publicRouter.get("/signUp", publicsController.createSignUp);
publicRouter.post("/signUp", publicsController.storeSignUp);
publicRouter.get("/logIn", publicsController.createLogIn);
publicRouter.post("/logIn", publicsController.storeLogIn);
publicRouter.get("/logOut", publicsController.logOut);

publicRouter.get("/article/:slug", publicsController.show);
publicRouter.post("/comment/:slug", publicsController.storeComment);
publicRouter.get("/api/articles", publicsController.ApiArticles);

publicRouter.get("*", publicsController.NotFoundPage);

module.exports = publicRouter;
