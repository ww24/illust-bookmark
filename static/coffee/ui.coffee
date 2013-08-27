# ui.coffee

$ ->
  $addBookmarkForm = $("#add-bookmark-modal").find "form"
  $addBookmarkSubmit = $ "add-bookmark-submit"

  $addBookmarkForm.submit (e) ->
    e.preventDefault();

    $addBookmarkSubmit.button "loading"

    $.ajax
      method: "put"
      url: "/bookmark"
      headers:
        "X-CSRF-Token": csrf_token
      data: $(this).serialize()
    .done (data) ->
      location.assign("/bookmark/" + data.bookmark_id);
    .fail (ajax) ->
      console.log ajax.responseJSON

    console.log($(this).serialize());
