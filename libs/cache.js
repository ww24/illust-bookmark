/**
 * Illust Cache
 * libs/cache.js
 */

var request = require("request"),
    mime = require("mime-magic"),
    path = require("path"),
    fs = require("fs");

var illust_dir = path.resolve(__dirname, "../static/illust/");

var mime_to_ext = {
  "image/jpeg": ".jpg",
  "image/png" : ".png",
  "image/gif" : ".gif"
};

module.exports = function (params, callback) {
  var filename = params.filename,
      referer = params.referer,
      imageUrl = params.imageUrl;

  var file_path = path.join(illust_dir, filename);

  var requestStream = request({
    url: imageUrl,
    headers: {
      Referer: referer
    }
  });

  var writeStream = fs.createWriteStream(file_path);
  requestStream.pipe(writeStream);
  requestStream.on("end", function () {
    // check MIME Type
    mime(file_path, function (err, type) {
      if (err) {
        return callback({
          type: "mimeError",
          error: err
        }, file_path, type);
      }

      console.log(type);
      // mapping MIME Type -> ext
      var ext = mime_to_ext[type];

      if (! ext) {
        return callback({
          type: "mimeWrong",
          error: ext
        }, file_path, ext);
      }

      // add ext
      fs.rename(file_path, file_path + ext, function () {
        callback(null, file_path, ext);
      });
    });
  }).on("error", function (err) {
    callback({
      type: "requestError",
      error: err
    }, file_path, null);
  });
};
