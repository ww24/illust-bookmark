/**
 * Collection
 * routers/collection.js
 */

module.exports = function (app, model) {
  app.get("/collection", function (req, res) {
    res.locals({
      template: "collection/list",
      title: "Home - "
    });

    if (req.xhr)
      res.json([]);
    else
      res.render(res.locals.template);
  });
};
