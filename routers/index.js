/**
 * Routers
 * router/index.js
 */

var mongoose = require("mongoose");

module.exports = function (model) {
  var app = this;

  app.get("/", function (req, res) {
    res.locals({
      template: "index"
    });

    res.render(res.locals.template);
  });

  app.get("/bookmark/:mark_id", function () {
    res.locals({
      template: "bookmark"
    });

    res.render(res.local.template);
  });
};
