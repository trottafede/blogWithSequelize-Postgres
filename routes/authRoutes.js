const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/signup", authController.createUser);
authRouter.post("/signup", authController.storeUser);

authRouter.get("/login", authController.createLogIn);
authRouter.post("/login", authController.storeLogin);

// --------------------------Google auth-------------------------------
authRouter.get("/google", authController.createGoogleLogin);
authRouter.get("/google/callback", authController.storeGoogleLogin);
// ----------------------------------------------------------------

// --------------------Facebook auth----------------------------
authRouter.get("/auth/facebook", authController.createFacebookLogin);
authRouter.get("/auth/facebook/callback", authController.storeFacebookLogin);
// ----------------------------------------------------------------
authRouter.get("/logOut", authController.logOut);

module.exports = authRouter;
