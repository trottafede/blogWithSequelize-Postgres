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

// FB?

publicRouter.get("/auth/facebook", passport.authenticate("facebook"));

publicRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
// --

publicRouter.get("/generate", publicsController.generateArticles);

publicRouter.get("/logOut", publicsController.logOut);

publicRouter.get("/article/:slug", publicsController.show);
publicRouter.get("/api/articles", publicsController.ApiArticles);

publicRouter.get("*", publicsController.NotFoundPage);

module.exports = publicRouter;
