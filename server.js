/**
 * Illust Bookmark
 * 
 */

var express = require("express"),
    flash = require("connect-flash"),
    hogan = require("hogan-express"),
    passport = require("passport"),
    colors = require("colors"),
    http = require("http"),
    path = require("path"),
    crypto = require("crypto"),
    routers = require("./routers"),
    models = require("./models");

// start server
exports.runServer = function (mode) {
  // set production mode
  process.env.NODE_ENV = mode || "production";

  var app = express();

  // setup express
  app.configure(function () {
    app.disable("x-powered-by");
    app.set("port", 3000);

    // auth check token
    app.set("token", ~~(Math.random() * Math.pow(10, 8)));

    // DB Settings
    app.set("mongo", {
      hostname: "127.0.0.1",
      port: 27017,
      username: "",
      password: "",
      name: "",
      db: "illub"
    });

    // Google OAuth Settings
    app.set("oauth-google", {
      returnURL: "http://localhost:8000/oauth/google/callback",
      realm: "http://localhost:8000/",
      passReqToCallback: true
    });

    // view settings
    app.set("view engine", "html");
    app.set("layout", "layout");
    app.set("views", path.resolve(__dirname, "views"));
    app.engine("html", hogan);
    app.set("partials", {
      menu      : "partials/menu",
      modal     : "partials/modal",
      header    : "partials/header",
      footer    : "partials/footer",
      bookmarks : "partials/bookmarks" 
    });
    app.locals({
      menu: function (title) {
        var active = title === this.template.split("/")[0] ? "active" : "";
        return active;
      },
      isLoggedIn: function () {
        return !! this.user;
      },
      gravatar: function () {
        return "http://gravatar.com/avatar/" + crypto.createHash("md5").update(this.email).digest("hex");
      }
    });

    // static contents
    app.use(express.static(path.resolve(__dirname, "static")));

    // body parser, cookie settings
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({
      secret: "imlncpx:orp9d",
      cookie: {maxAge: 1000 * 3600 * 24 * 7}
    }));

    // passport settings
    app.use(passport.initialize());
    app.use(passport.session());

    // user data -> template
    app.use(function (req, res, next) {
      res.locals.user = req.user;
      next();
    });

    // connect flash
    app.use(flash());

    // csrf settings
    app.use(express.csrf());
    app.use(function (req, res, next) {
      // set csrf token
      res.locals.csrf_token = req.session._csrf;
      next();
    });

    // resolve route
    app.use(app.router);
  });

  // dev settings
  app.configure("development", function () {
    console.log("development mode".red);
    app.use(express.logger("dev"));
    app.use(express.errorHandler());
  });

  app.configure("production", function () {
    console.log("production mode".red);
  });

  // call router
  routers.call(app, models.call(app));

  // listen
  http.createServer(app).listen(app.get("port"), function () {
    console.log("server start".green);
  });
};
