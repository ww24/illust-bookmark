$(function() {
  var $addBookmarkForm, $addBookmarkSubmit, $bookmarkStatus, $removeBookmark, $socialButton, $useButton, $usingGuide;
  $useButton = $("#use-button");
  $usingGuide = $("#using-guide");
  $useButton.click(function() {
    $usingGuide.animate({
      height: "500px"
    }, 500, function() {
      return $(this).height("auto");
    });
    return $(this).hide();
  });
  $addBookmarkForm = $("#add-bookmark-modal").find("form");
  $addBookmarkSubmit = $("add-bookmark-submit");
  $addBookmarkForm.submit(function(e) {
    e.preventDefault();
    $addBookmarkSubmit.button("loading");
    return $.ajax({
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
  });
  $removeBookmark = $("#remove-bookmark");
  $removeBookmark.click(function() {
    $(this).button("loading");
    return $.ajax({
      method: "delete",
      url: "/bookmark/" + bookmark_id,
      headers: {
        "X-CSRF-Token": csrf_token
      }
    }).done(function(data) {
      return console.log(data);
    }).fail(function(ajax) {
      return console.log(ajax.responseJSON);
    });
  });
  $bookmarkStatus = $("#bookmark-status");
  $bookmarkStatus.hover(function() {
    return $(this).removeClass("btn-info").addClass("btn-danger").text("リムーブ");
  }, function() {
    return $(this).removeClass("btn-danger").addClass("btn-info").text("フォロー中");
  });
  $socialButton = $("#social-button");
  return $socialButton.delay(2000).animate({
    opacity: 1
  }, 500);
});

/*
//@ sourceMappingURL=ui.js.map
*/