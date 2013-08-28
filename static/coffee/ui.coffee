# ui.coffee

$ ->
  # Add Bookmark Form
  $addBookmarkForm = $("#add-bookmark-modal").find "form"
  $addBookmarkSubmit = $ "add-bookmark-submit"

  $addBookmarkForm.submit (e) ->
    e.preventDefault()

    $addBookmarkSubmit.button "loading"

    $.ajax
      method: "put"
      url: "/bookmark"
      headers:
        "X-CSRF-Token": csrf_token
      data: $(this).serialize()
    .done (data) ->
      location.assign "/bookmark/" + data.bookmark_id
    .fail (ajax) ->
      console.log ajax.responseJSON


  # Remove Bookmark Button
  $removeBookmark = $ "#remove-bookmark"

  $removeBookmark.click ->
    $(this).button "loading"

    $.ajax
      method: "delete"
      url: "/bookmark/" + bookmark_id
      headers:
        "X-CSRF-Token": csrf_token
    .done (data) ->
      console.log data
    .fail (ajax) ->
      console.log ajax.responseJSON

  # Bookmark Status Button
  $bookmarkStatus = $ "#bookmark-status"

  $bookmarkStatus.hover ->
    $(this)
      .removeClass("btn-info")
      .addClass("btn-danger")
      .text("リムーブ")
  , ->
    $(this)
      .removeClass("btn-danger")
      .addClass("btn-info")
      .text("フォロー中")

