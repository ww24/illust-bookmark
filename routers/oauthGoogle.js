/**
 * OAuth Google
 * routers/oauthGoogle.js
 */

var passport = require("passport"),
    googleStrategy = require("passport-google").Strategy;

module.exports = function (app, model) {
  // initialize authenticate
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (id, done) {
    done(null, id);
  });

  passport.use(new googleStrategy(app.get("oauth-google"), function (req, id, profile, done) {
    // user profile
    var user = {
      status: "ok",
      name: {
        first: profile.name.givenName,
        last:  profile.name.familyName
      },
      screen_name: profile.name.givenName + " " + profile.name.familyName,
      email: profile.emails[0].value,
      bookmarks: []
    };

    console.log(user);
    model.Google.findOne({
      email: user.email
    }, function (err, google) {
      if (err) {
        console.log(err);
      }

      model.User.findOne({
        google: google
      }).populate("twitter")
      .populate("google")
      .populate("bookmarks")
      .exec(function (err, userData) {
        if (err) {
          console.log(err);
          return done(err, userData);
        }

        if (userData) {
          console.log("signin");
          user.bookmarks = userData.bookmarks;
          return done(null, user);
        }

        console.log("signup");
        google = new model.Google({
          email: user.email,
          name: user.name
        });
        google.save(function (err) {
          if (err) {
            console.log(err);
          }

          userData = new model.User({
            google: google
          });
          userData.save(function (err) {
            if (err) {
              console.log(err);
              return done(err, null);
            }

            done(null, user);
          });
        })
      });
    });
  }));

  // check authenticate session
  app.get("/oauth/google", function (req, res, next) {
    req.flash("authenticate");
    req.flash("authenticate", app.get("token"));
    next();
  });
  app.get("/oauth/google/callback", function (req, res, next) {
    if (req.flash("authenticate")[0] === app.get("token"))
      return next();

    req.flash("error", {message: "予期せぬ認証エラー。再認証してください。"});
    res.redirect("/");
  });
  // google auth
  app.get("/oauth/google", passport.authenticate("google"));
  app.get("/oauth/google/callback", passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/oauth/fail",
    failureFlash: true
  }));

  // authentication failure
  app.get("/oauth/fail", function (req, res) {
    console.log(req.flash("error"));
    req.flash("error", {message: "認証失敗"});
    res.redirect("/");
  });

  // logout
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
