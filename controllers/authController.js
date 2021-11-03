const passport = require("passport");
const { User } = require("../models");

module.exports = {
  index: (req, res) => {},
  show: (req, res) => {},
  create: (req, res) => {},
  store: (req, res) => {},
  edit: (req, res) => {},
  update: (req, res) => {},
  destroy: (req, res) => {},

  createUser: (req, res) => {
    res.render("createUser", { user: req.user });
  },
  storeUser: async (req, res) => {
    let { name, lastname, email, password } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstname: name,
        lastname,
        email,
        password,
      },
    });

    if (created) {
      req.login(user, () => res.redirect("/"));
    } else {
      res.redirect("/login");
    }
  },

  createLogIn: async (req, res) => {
    res.render("loginForm", { user: req.user });
  },
  storeLogin: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),

  createGoogleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  storeGoogleLogin: passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/",
  }),

  createFacebookLogin: passport.authenticate("facebook", {
    scope: "email",
  }),
  storeFacebookLogin: passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/",
    scope: ["email"],
  }),

  logOut: async (req, res) => {
    // await req.session.destroy();
    req.logout();

    res.redirect("/login"); // will always fire after session is destroyed
  },
};
