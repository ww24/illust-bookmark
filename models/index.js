/**
 * Models
 * models/index.js
 */

var mongoose = require("mongoose"),
    lib = require("../libs");

module.exports = function () {
  var app = this,
      mongo = app.get("mongo"),
      mongoURL = "mongodb://";

  if (mongo.username && mongo.password)
    mongoURL += mongo.username + ":" + mongo.password + "@";
  mongoURL += mongo.hostname + ":" + mongo.port + "/" + mongo.db;

  var db = mongoose.connect(mongoURL);

  return lib.loader(__dirname, mongoose);
};
