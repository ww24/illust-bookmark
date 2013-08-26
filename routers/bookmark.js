/**
 * Bookmark
 * routers/bookmark.js
 */

module.exports = function (app) {
  app.get("/bookmark/:mark_id", function (req, res) {
    res.locals({
      template: "bookmark",
      title: "タイトル - "
    });

    res.render(res.locals.template);
  });
};
