const express = require("express");
const publicRouter = express.Router();
const publicsController = require("../controllers/publicsController");
const passport = require("passport");

publicRouter.get("/", publicsController.index);

publicRouter.get("/signup", publicsController.createUser);
publicRouter.post("/signup", publicsController.storeUser);

publicRouter.get("/login", publicsController.createLogIn);
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

publicRouter.get("/generate", publicsController.generateArticles);

publicRouter.get("/logOut", publicsController.logOut);

publicRouter.get("/article/:slug", publicsController.show);
publicRouter.get("/api/articles", publicsController.ApiArticles);

publicRouter.get("*", publicsController.NotFoundPage);

module.exports = publicRouter;
