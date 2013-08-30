/**
 * Home
 * routers/home.js
 */

module.exports = function (app, model) {
  app.get("/home", function (req, res) {
    res.locals({
      template: "home",
      title: "Home - "
    });

    // debug
    console.log(req.user);

    model.Google.findOne({
      email: req.user.email
    }, function (err, google) {
      if (err || ! google) {
        console.log(err);
        return res.send(500);
      }

      model.User.findOne({
        google: google
      }).populate("bookmarks")
      .exec(function (err, user) {
        if (err || ! user) {
          console.log(err);
          return res.send(500);
        }

        res.locals.user.bookmarks = function () {
          return user.bookmarks;//.slice(0, 7);
        };

        res.render(res.locals.template);
      });
    });
  });
};
