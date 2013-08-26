/**
 * Routers
 * routers/index.js
 */

var mongoose = require("mongoose"),
    lib = require("../libs");

module.exports = function (model) {
  var app = this;

  app.get("/", function (req, res) {
    res.locals({
      template: "index",
      title: ""
    });

    res.render(res.locals.template);
  });

  lib.loader(__dirname, app);
};
