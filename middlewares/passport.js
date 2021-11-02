const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const { User } = require("../models");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false,
      // Docs: "The default value is true, but using the default has been deprecated ".
      saveUninitialized: false,
      // Docs: "The default value is true, but using the default has been deprecated ".
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        const user = await User.findOne({ where: { email } });
        try {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!(await user.validPassword(password))) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.URL_CALLBACK}google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        let [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            password: "asdasd",
            googleId: profile.id,
          },
        });
        return done(null, user);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.URL_CALLBACK}auth/facebook/callback`,
        profileFields: ["id", "displayName", "photos", "emails"],
      },
      async function (accessToken, refreshToken, profile, done) {
        let [user, created] = await User.findOrCreate({
          where: { facebookId: profile.id },
          defaults: {
            firstname: profile.displayName,
            lastname: "asda",
            email: profile.emails,
            password: "asdasd",
            facebookId: profile.id,
          },
        });
        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, user);
      });
  });
};
