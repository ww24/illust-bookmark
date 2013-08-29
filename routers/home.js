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

    res.render(res.locals.template);
  });
};
