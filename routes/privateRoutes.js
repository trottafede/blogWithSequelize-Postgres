const express = require("express");
const adminRouter = express.Router();

const privatesController = require("../controllers/privatesController");

// const session = require("express-session");
// adminRouter.use(
//   session({
//     secret: "AlgúnTextoSuperSecreto",
//     resave: false,
//     // Docs: "The default value is true, but using the default has been deprecated ".
//     saveUninitialized: false,
//     // Docs: "The default value is true, but using the default has been deprecated ".
//   })
// );
// adminRouter.use(passport.initialize());
// adminRouter.use(passport.session());

// passport.use(
//   new LocalStrategy(function (email, password, done) {
//     User.findOne({ email }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

// ---------------------------------------------------------
adminRouter.get("", privatesController.index);

adminRouter.get("/updateArticle/:slug", privatesController.editArticle);
adminRouter.post("/updateArticle/:slug", privatesController.updateArticle);

adminRouter.get("/createArticle", privatesController.createArticle);
adminRouter.post("/createArticle", privatesController.storeArticle);

adminRouter.get("/deleteArticle/:slug", privatesController.destroyArticle);

module.exports = adminRouter;
