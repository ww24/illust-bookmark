/**
 * Bookmark
 * routers/bookmark.js
 */

var url = require("url"),
    fs = require("fs"),
    lib = require("../libs");

module.exports = function (app, model) {
  // Bookmark 一覧
  app.get("/bookmark", function (req, res) {
    res.locals({
      template: "bookmark/list",
      title: "Bookmarks - "
    });

    model.Bookmark.find()
    .populate("tags")
    .populate("comments")
    .exec(function (err, bookmarks) {
      res.locals.bookmarks = bookmarks;

      // xhr なら JSON, そうでなければ HTML を返す
      if (req.xhr)
        res.json(res.locals.bookmarks);
      else
        res.render(res.locals.template);
    });
  });

  // Bookmark 単体
  app.get("/bookmark/:mark_id", function (req, res) {
    res.locals({
      template: "bookmark/single",
      title: "タイトル - "
    });

    model.Bookmark.findOne({
      id: req.params.mark_id
    })
    .populate("tags")
    .populate("comments")
    .exec(function (err, bookmark) {
      if (! bookmark)
        return res.send(404);

      Object.defineProperty(bookmark, "timestamp", {
        value: lib.formatDate(bookmark.timestamp)
      });
      res.locals.bookmark = bookmark;

      // xhr なら JSON, そうでなければ HTML を返す
      if (req.xhr)
        res.json({});
      else
        res.render(res.locals.template);
    });
  });

  // Bookmark 作成
  app.put("/bookmark", function (req, res) {
    // check XHR
    if (! req.xhr)
      return res.send(403);

    var params = {
      title: req.body.title,
      url: req.body.url || "",
      imageUrl: req.body.imageUrl
    };

    params.url = params.url || url.parse(params.imageUrl).hostname;

    // generate bookmark id
    lib.tagid(function (tagid, callback) {
      // check conflict
      model.Bookmark.find({
        id: tagid
      }, function (err, bookmark) {
        callback(bookmark.length === 0);
      });
    }, function (tagid) {
      // create Bookmark
      var bookmark = new model.Bookmark({
        id: tagid,
        ext: ".jpg",
        title: params.title,
        url: params.url,
        imageUrl: params.imageUrl
      });

      bookmark.save(function (err) {
        if (err) {
          if (err.name === "ValidationError")
            return res.json(400, {
              message: "Validation Error",
              errors: err.errors
            });

          return res.json(500, {
            message: "DB Error",
            error: err
          });
        }

        // get cache
        lib.cache({
          filename: tagid,
          referer: params.url,
          imageUrl: params.imageUrl 
        }, function (err, file_path, ext) {
          if (err) {
            // 後片付け
            // Bookmark 削除
            bookmark.remove();
            bookmark.save(function (err) {
              if (err)
                console.log(err);
            });

            // Cache 削除
            fs.unlink(file_path);

            return res.json(500, {
              message: "cache error",
              errors: [err]
            });
          }

          // update ext
          bookmark.set("ext", ext);
          bookmark.save(function (err) {
            if (err) {
              return res.json(500, {
                message: "DB Error",
                error: err
              });
            }

            // save bookmark list
            model.Google.findOne({
              email: req.user.email
            }, function (err, google) {
              if (err) {
                return res.json(500, {
                  message: "DB Error",
                  error: err
                });
              }

              model.User.findOne({
                google: google
              }).populate("bookmarks")
              .exec(function (err, user) {
                if (err || ! user) {
                  return res.json(500, {
                    message: "DB Error",
                    error: err
                  });
                }

                user.bookmarks.push(bookmark);
                user.save(function (err) {
                  if (err) {
                    return res.json(500, {
                      message: "DB Error",
                      error: err
                    });
                  }

                  res.json({
                    bookmark_id: tagid
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  // Bookmark 編集
  app.post("/bookmark/:mark_id", function (req, res) {
    // check XHR
    if (! req.xhr)
      return res.send(403);

    var params = {
      title: req.body.title,
      url: req.body.url,
      imageUrl: req.body.imageUrl
    };

    model.Bookmark.findOne({
      id: req.params.mark_id
    }, function (err, bookmark) {
      if (err) {
        if (err.name === "ValidationError")
          return res.json(400, {
            message: "Validation Error",
            errors: err.errors
          });

        return res.json(500, {
          message: "DB Error",
          error: err
        });
      }

      res.send(200);
    });
  });

  // Bookmark 削除
  app.delete("/bookmark/:mark_id", function (req, res) {
    // check XHR
    if (! req.xhr)
      return res.send(403);


  });
};
