$(function() {
  var $addBookmarkForm, $addBookmarkSubmit;
  $addBookmarkForm = $("#add-bookmark-modal").find("form");
  $addBookmarkSubmit = $("add-bookmark-submit");
  return $addBookmarkForm.submit(function(e) {
    e.preventDefault();
    $addBookmarkSubmit.button("loading");
    $.ajax({
      method: "put",
      url: "/bookmark",
      headers: {
        "X-CSRF-Token": csrf_token
      },
      data: $(this).serialize()
    }).done(function(data) {
      return location.assign("/bookmark/" + data.bookmark_id);
    }).fail(function(ajax) {
      return console.log(ajax.responseJSON);
    });
    return console.log($(this).serialize());
  });
});

/*
//@ sourceMappingURL=ui.js.map
*/