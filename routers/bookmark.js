/**
 * Bookmark
 * routers/bookmark.js
 */

var url = require("url"),
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

  app.get("/bookmark/:mark_id", function (req, res) {
    res.locals({
      template: "bookmark/single",
      title: "タイトル - "
    });

    model.Bookmark.find({
      id: req.params.mark_id
    })
    .populate("tags")
    .populate("comments")
    .exec(function (err, bookmark) {
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

    var valid = new lib.Validator();
    valid.check(params.title).notEmpty();
    if (params.url !== "")
      valid.check(params.url).isUrl();
    valid.check(params.imageUrl).isUrl();
    var errors = valid.getErrors();
    if (errors.length > 0)
      return res.json(400, errors);

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
        title: params.title,
        url: params.url,
        imageUrl: params.imageUrl,
        timestamp: new Date()
      });

      bookmark.save(function (err) {
        if (err) {
          res.json(500, {
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

  // Bookmark 編集
  app.post("/bookmark/:mark_id", function (req, res) {

  });

  // Bookmark 削除
  app.delete("/bookmark/:mark_id", function (req, res) {

  });
};
